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
import { SpringModal } from "../posts/Modal";
import { toasts } from "@/components/ui/toast";

export const Favorites = () => {
  const { profile } = useAuth();
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [loadingDeleteFavorite, setLoadingDeleteFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [propertyFavorite, setPropertyFavorite] = useState(null);
  const getFavorites = async () => {
    setLoadingFavorites(true);
    try {
      const { data } = await supabase
        .from("favorites")
        .select(
          "property_id, properties(*,  property_type_id (*), operation_type_id (*),user_type (*) ) "
        )
        .eq("user_id", profile?.id);

      const transform = data.map((item) => item.properties);

      setFavorites(transform);

      setLoadingFavorites(false);
    } catch (error) {
      setLoadingFavorites(false);
    }
  };

  const onDeleteFavorite = (property) => {
    setIsOpen(true);
    setPropertyFavorite(property);
  };

  const onClickFavorite = async () => {
    setIsOpen(false);
    setLoadingDeleteFavorite(true);
    try {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", profile?.id)
        .eq("property_id", propertyFavorite?.id)
        .select();

      setLoadingDeleteFavorite(false);
      getFavorites();

      toasts("Eliminado con exitosamente");
    } catch (error) {
      setLoadingDeleteFavorite(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  if (loadingFavorites) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SiteHeader title="Mis favoritos" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full  ">
            {favorites.length === 0 ? (
              <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <IconFolderCode />
                    </EmptyMedia>
                    <EmptyTitle>No tienes propiedade favoritas</EmptyTitle>
                    <EmptyDescription className="lg:w-2xl">
                      ¡Agrega tus propiedades favoritas! pronto alcanzaras tus
                      metas...
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Link to={"/dashboard"} className="flex gap-2">
                      <Button>Descubrir</Button>
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
                post={favorites}
                favorites={{
                  actionFavorite: onDeleteFavorite,
                  loading: loadingDeleteFavorite,
                  isProfile: true,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        propertyDelete={propertyFavorite}
        onClickDelete={onClickFavorite}
      />
    </>
  );
};
