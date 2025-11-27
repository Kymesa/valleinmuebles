import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, MessageCircle, Home } from "lucide-react";
import { toasts } from "@/components/ui/toast";
import { SiteHeader } from "@/components/ui/dashboard/site-header";

export const Chat = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property");
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [property, setProperty] = useState(null);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (profile) {
      if (id && id !== "new") {
        loadExistingChat(id);
      } else if (propertyId) {
        initializeChat();
      }
    }
  }, [id, propertyId, profile]);

  const addMessage = (newMessage) => {
    setMessages((currentMessages) => {
      if (currentMessages.some((msg) => msg.id === newMessage.id)) {
        return currentMessages;
      }
      return [...currentMessages, newMessage];
    });
  };

  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`public:messages:chat_id=eq.${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          if (payload.new && payload.new.chat_id === chatId) {
            addMessage(payload.new);
          }
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const loadExistingChat = async (chatId) => {
    try {
      setLoading(true);

      const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .select(
          `
          *,
          property:properties (*)
        `
        )
        .eq("id", chatId)
        .single();

      if (chatError) throw chatError;

      setChatId(chatData.id);
      setProperty(chatData.property);

      const otherUserId =
        chatData.buyer_id === profile.id
          ? chatData.seller_id
          : chatData.buyer_id;

      const { data: otherUserData, error: userError } = await supabase
        .from("users_extended")
        .select(
          `
          id, 
          email,
          user_type,
          user_profiles (*),
          owner_profiles (*),
          agency_profiles (*)
        `
        )
        .eq("id", otherUserId)
        .single();

      if (!userError && otherUserData) {
        const userProfile =
          otherUserData.user_profiles ||
          otherUserData.owner_profiles ||
          otherUserData.agency_profiles;

        setOtherUser({
          id: otherUserData.id,
          email: otherUserData.email,
          user_type: otherUserData.user_type,
          profile: userProfile || null,
        });
      } else {
        const { data: basicUser } = await supabase
          .from("users_extended")
          .select("id, email")
          .eq("id", otherUserId)
          .single();

        setOtherUser(basicUser || { email: "Usuario" });
      }

      await fetchMessages(chatData.id);
      setLoading(false);
    } catch (error) {
      console.error("Error loading chat:", error);
      toasts("Error al cargar el chat");
      setLoading(false);
    }
  };

  const initializeChat = async () => {
    try {
      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .select("*, user_id")
        .eq("id", propertyId)
        .single();

      if (propertyError) throw propertyError;

      setProperty(propertyData);

      const { data: existingChat } = await supabase
        .from("chats")
        .select("*")
        .eq("property_id", propertyId)
        .eq("buyer_id", profile.id)
        .single();

      if (existingChat) {
        setChatId(existingChat.id);

        const otherUserId = existingChat.seller_id;

        const { data: otherUserData, error: userError } = await supabase
          .from("users_extended")
          .select(
            `
            id, 
            email,
            user_type,
            user_profiles (*),
            owner_profiles (*),
            agency_profiles (*)
          `
          )
          .eq("id", otherUserId)
          .single();

        if (!userError && otherUserData) {
          const userProfile =
            otherUserData.user_profiles ||
            otherUserData.owner_profiles ||
            otherUserData.agency_profiles;

          setOtherUser({
            id: otherUserData.id,
            email: otherUserData.email,
            user_type: otherUserData.user_type,
            profile: userProfile || null,
          });
        } else {
          const { data: basicUser } = await supabase
            .from("users_extended")
            .select("id, email")
            .eq("id", otherUserId)
            .single();

          setOtherUser(basicUser || { email: "Usuario" });
        }

        await fetchMessages(existingChat.id);
      } else {
        const sellerId = propertyData.user_id;
        const { data: newChat, error: createError } = await supabase
          .from("chats")
          .insert({
            property_id: propertyId,
            buyer_id: profile.id,
            seller_id: sellerId,
            topic: propertyData.title,
          })
          .select()
          .single();

        if (createError) throw createError;

        setChatId(newChat.id);

        const { data: otherUserData, error: userError } = await supabase
          .from("users_extended")
          .select(
            `
            id, 
            email,
            user_type,
            user_profiles (*),
            owner_profiles (*),
            agency_profiles (*)
          `
          )
          .eq("id", sellerId)
          .single();

        if (!userError && otherUserData) {
          const userProfile =
            otherUserData.user_profiles ||
            otherUserData.owner_profiles ||
            otherUserData.agency_profiles;

          setOtherUser({
            id: otherUserData.id,
            email: otherUserData.email,
            user_type: otherUserData.user_type,
            profile: userProfile || null,
          });
        } else {
          const { data: basicUser } = await supabase
            .from("users_extended")
            .select("id, email")
            .eq("id", sellerId)
            .single();

          setOtherUser(basicUser || { email: "Usuario" });
        }

        await fetchMessages(newChat.id);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error initializing chat:", error);
      toasts("Error al cargar el chat");
      setLoading(false);
    }
  };

  const fetchMessages = async (chatIdParam) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatIdParam)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !chatId) return;

    setSending(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          sender_id: profile.id,
          content: message.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      setMessage("");

      if (data) {
        addMessage(data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toasts("Error al enviar el mensaje");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SiteHeader title="Chat" />
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>

            <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {property?.images ? (
                <img
                  src={property.images}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#7168D3] to-[#5d57b5] flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {otherUser?.profile?.full_name || otherUser?.email || "Usuario"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {property?.title}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-600">
                ¡Inicia la conversación! Pregunta sobre esta propiedad
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender_id === profile.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  } px-1`}
                >
                  <div
                    className={`max-w-[75%] rounded-3xl px-4 py-2.5 ${
                      isMe
                        ? "bg-[#7168D3] text-white rounded-br-md"
                        : "bg-white rounded-bl-md shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-[15px] leading-[1.4]">{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 bg-white p-3">
          <div className="flex items-end gap-2 bg-gray-100 rounded-3xl px-4 py-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mensaje"
              disabled={sending}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 flex-1 text-[15px] py-2 h-auto min-h-0"
            />
            <Button
              onClick={sendMessage}
              disabled={!message.trim() || sending}
              size="icon"
              className="h-8 w-8 rounded-full bg-[#7168D3] hover:bg-[#5d57b5] disabled:opacity-50 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
