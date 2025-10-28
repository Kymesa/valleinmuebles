import { SiteHeader } from "@/components/ui/dashboard/site-header";
import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { SectionCards } from "@/components/ui/dashboard/section-cards";
import { SpringModal } from "./Modal";
export const Post = () => {
  const { profile } = useAuth();
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingDeletePost, setLoadingDeletePost] = useState(false);
  const [post, setPost] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [propertyDelete, setPropertyDelete] = useState(null);
  const getPosts = async () => {
    setLoadingPost(true);
    try {
      const { data: post } = await supabase
        .from("properties")
        .select(
          `*,
            user_type (*),
            property_type_id (*),
            operation_type_id (*)`
        )
        .eq("user_id", profile?.id)
        .order("created_at", { ascending: false });
      setPost(post);

      setLoadingPost(false);
    } catch (error) {
      setLoadingPost(false);
    }
  };

  const onDeletePost = (property) => {
    setIsOpen(true);
    setPropertyDelete(property);
  };

  const onClickDelete = async () => {
    setIsOpen(false);
    setLoadingDeletePost(true);
    try {
      await supabase
        .from("properties")
        .delete()
        .eq("id", propertyDelete.id)
        .select();
      setLoadingDeletePost(false);
      getPosts();
    } catch (error) {
      setLoadingDeletePost(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loadingPost) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SiteHeader title="Mis publicaciones" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full  ">
            {post.length === 0 ? (
              <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <IconFolderCode />
                    </EmptyMedia>
                    <EmptyTitle>No tienes publicaciones</EmptyTitle>
                    <EmptyDescription className="lg:w-2xl">
                      ¡Crea tu primera publicación! Comparte tu inmueble con
                      miles de personas en Valledupar.
                    </EmptyDescription>

                    <EmptyDescription className="lg:w-2xl">
                      Sube fotos, agrega los detalles y publica en minutos.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Link to={"/create-post"} className="flex gap-2">
                      <Button>Nueva publicación</Button>
                    </Link>
                  </EmptyContent>
                  <Button
                    variant="link"
                    asChild
                    className="text-muted-foreground"
                    size="sm"
                  >
                    <Link to={"/help"}>
                      Necesito ayuda <ArrowUpRightIcon />
                    </Link>
                  </Button>
                </Empty>
              </div>
            ) : (
              <SectionCards
                post={post}
                profile={{
                  isProfile: true,
                  onDelete: onDeletePost,
                  loadingDelete: loadingDeletePost,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        propertyDelete={propertyDelete}
        onClickDelete={onClickDelete}
      />
    </>
  );
};
