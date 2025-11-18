import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Button } from "@/components/ui/button";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SiteHeader } from "@/components/ui/dashboard/site-header";
import { Home } from "lucide-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { toasts } from "@/components/ui/toast";

const formatTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "hace un momento";
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400)
    return `hace ${Math.floor(diffInSeconds / 3600)} hrs`;
  if (diffInSeconds < 604800)
    return `hace ${Math.floor(diffInSeconds / 86400)} días`;
  return past.toLocaleDateString("es-CO");
};

export const ChatsList = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (profile) {
      fetchChats();
    }
  }, [profile]);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const { data: chatsData, error: chatsError } = await supabase
        .from("chats")
        .select(
          `
          *,
          property:properties (
            id,
            title,
            images,
            price,
            city,
            department
          )
        `
        )
        .or(`buyer_id.eq.${profile.id},seller_id.eq.${profile.id}`)
        .order("last_message_at", { ascending: false });

      if (chatsError) throw chatsError;

      const chatsWithMessages = await Promise.all(
        (chatsData || []).map(async (chat) => {
          const { data: lastMessage } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", chat.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          const otherUserId =
            chat.buyer_id === profile.id ? chat.seller_id : chat.buyer_id;

          const { data: otherUserData } = await supabase
            .from("users_extended")
            .select(
              `
              id,
              email,
              user_profiles (*),
              owner_profiles (*),
              agency_profiles (*)
            `
            )
            .eq("id", otherUserId)
            .single();

          const userProfile =
            otherUserData?.user_profiles ||
            otherUserData?.owner_profiles ||
            otherUserData?.agency_profiles;

          return {
            ...chat,
            lastMessage: lastMessage || null,
            otherUser: {
              id: otherUserId,
              email: otherUserData?.email || "Usuario",
              profile: userProfile || null,
            },
          };
        })
      );

      setChats(chatsWithMessages);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SiteHeader title="Mis Chats" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full">
            {chats.length === 0 ? (
              <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <IconMessageCircle />
                    </EmptyMedia>
                    <EmptyTitle>No tienes chats aún</EmptyTitle>
                    <EmptyDescription className="lg:w-2xl">
                      ¡Comienza una conversación! Haz clic en "Contactar" en
                      cualquier propiedad para hablar con el vendedor.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button onClick={() => navigate("/dashboard")}>
                      Ver Propiedades
                    </Button>
                  </EmptyContent>
                </Empty>
              </div>
            ) : (
              <div className="space-y-1 px-4">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => openChat(chat.id)}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                      {chat.property?.images ? (
                        <img
                          src={chat.property.images}
                          alt={chat.property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#7168D3] to-[#5d57b5] flex items-center justify-center">
                          <Home className="h-7 w-7 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-base text-gray-900 truncate">
                          {chat.otherUser?.profile?.full_name ||
                            chat.otherUser?.email ||
                            "Usuario"}
                        </p>
                        {chat.lastMessage && (
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {formatTimeAgo(chat.lastMessage.created_at)}
                          </span>
                        )}
                      </div>

                      {chat.lastMessage ? (
                        <p className="text-sm text-gray-600 line-clamp-1 truncate">
                          {chat.lastMessage.sender_id === profile.id
                            ? "Tú: "
                            : ""}
                          {chat.lastMessage.content}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          {chat.property?.title || chat.topic}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
