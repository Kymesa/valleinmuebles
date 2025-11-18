import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { SiteHeader } from "@/components/ui/dashboard/site-header";
import { SectionCards } from "@/components/ui/dashboard/section-cards";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { IconBell } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link, useNavigate } from "react-router";
import { toasts } from "@/components/ui/toast";
export const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, profile } = useAuth();
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [post, setPost] = useState([]);
  const getPosts = async () => {
    const token = localStorage.getItem("@token");
    if (!token) {
      return toasts("No hay token");
    }
    setLoadingPost(true);
    try {
      const { data: post } = await supabase.from("properties").select(`*,
          user_type (*),
          property_type_id (*),
          operation_type_id (*)`);
      setPost(post);

      setLoadingPost(false);
    } catch (error) {
      setLoadingPost(false);
    }
  };

  const addFavorites = async (property) => {
    const token = localStorage.getItem("@token");
    if (!token) {
      return toasts("No hay token");
    }
    try {
      setLoadingFavorites(true);
      const { error } = await supabase
        .from("favorites")
        .insert([{ user_id: profile?.id, property_id: property?.id }]);
      setLoadingFavorites(false);
      if (error?.code === "23505") {
        return toasts("Ya esta agregada a favoritos");
      }
      toasts("Agregado con exito a favoritos");
      navigate("/favorites");
    } catch (error) {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading || loadingPost) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SiteHeader title="Descubrir" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {post.length === 0 ? (
              <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
                <EmptyHeader>
                  <EmptyMedia variant="icon" className="bg-[#7168D3]">
                    <IconBell color="white" />
                  </EmptyMedia>
                  <EmptyTitle>No hay publicaciones recientes</EmptyTitle>
                  <EmptyDescription>
                    Se el primero en publicar un inmueble en valle inmuebles
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Link to={"/create-post"} className="flex gap-2">
                    <Button>Nueva publicación</Button>
                  </Link>
                </EmptyContent>
              </Empty>
            ) : (
              <SectionCards
                post={post}
                favorites={{
                  actionFavorite: addFavorites,
                  loading: loadingFavorites,
                }}
              />
            )}

            {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
