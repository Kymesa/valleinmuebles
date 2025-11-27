import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { toasts } from "./ui/toast";

export const NotificationListener = () => {
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) return;

    const messageChannel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (payload.new && payload.new.sender_id !== profile.id) {
            toasts(payload.new.content, "Nuevo mensaje recibido");
          }
        }
      )
      .subscribe();

    const propertyChannel = supabase
      .channel("public:properties")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "properties",
        },
        (payload) => {
          if (payload.new) {
            if (payload.new.user_id !== profile.id) {
              toasts(payload.new.title, "Nueva propiedad publicada");
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(propertyChannel);
    };
  }, [profile]);

  return null; // This component doesn't render anything visible
};
