import {
  IconBath,
  IconBed,
  IconBuildingSkyscraper,
  IconMapPin,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "../spinner";
import { IconSave } from "../../../assets/icons/IconSave";
import { IconDelete } from "@/assets/icons/IconDelete";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Carousel3D } from "@/components/ui/carousel-3d";

export const SectionCards = ({ post, profile, favorites }: any) => {
  const navigate = useNavigate();
  const { profile: authProfile } = useAuth();

  const handleContact = async (property: any) => {
    if (property.user_id === authProfile?.id) {
      return;
    }

    try {
      // Buscar si ya existe un chat con esta propiedad

      const { data: existingChat, error } = await supabase
        .from("chats")
        .select("id")
        .eq("property_id", property.id)
        .eq("buyer_id", authProfile.id)
        .single();

      if (existingChat && !error) {
        // Si existe el chat, navegar a él
        navigate(`/chat/${existingChat.id}`);
      } else {
        // Si no existe, crear nuevo chat
        navigate(`/chat/new?property=${property.id}`);
      }
    } catch (error) {
      // Si hay error, intentar crear nuevo chat
      navigate(`/chat/new?property=${property.id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4  *:data-[slot=card]:shadow-[1px] *:data-[slot=card]:bg-[#7168D3]/10 lg:px-0 @lg/main:grid-cols-2 @5xl/main:grid-cols-4 rounded-md  border-none">
      {post?.map((property) => (
        <Card
          key={property.id}
          color="red"
          style={{ backgroundColor: "white" }}
          className=" border-none  rounded-md w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:-translate-x-[5px] hover:-translate-y-[5px]"
        >
          <div className="relative -translate-y-6">
            <Carousel3D images={property.images} alt={property.title} />
          </div>

          <CardHeader className="-translate-y-8">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-[14px] font-bold">
                {property.title}
              </CardTitle>
              <Badge className="text-[10px] px-3 py-1  bg-[#7168D3] z-40">
                {property.operation_type_id.name}
              </Badge>
            </div>
            <CardDescription className="text-[12px] text-muted-foreground line-clamp-2">
              {property.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-1 -translate-y-10">
            <div className="flex flex-row items-center gap-x-3 my-2 text-[10px] text-muted-foreground">
              <IconMapPin className="w-4 h-4" />
              <div className="flex flex-col items-center ">
                <span>{`${property.city}, ${property.department} `}</span>

                <span>{`${property.address} `}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-5 text-sm">
                <div className="flex text-[10px] items-center gap-1">
                  <IconBed className="w-4 h-4" />
                  {property.bedrooms}
                </div>
                <div className="flex text-[10px] items-center gap-1">
                  <IconBath className="w-4 h-4" />
                  {property.bathrooms}
                </div>
                <div className="flex text-[10px] items-center gap-1">
                  <IconBuildingSkyscraper className="w-4 h-4" />
                  {property.area_m2} m²
                </div>
              </div>
              <CardAction className="ml-4 ">
                <Badge variant="outline" className="text-[10px]">
                  {property.user_type.name}
                </Badge>
              </CardAction>
            </div>

            {!profile?.isProfile ? (
              <>
                <Badge className="text-[10px] px-3 py-1 mt-2 bg-[#7168D3]">
                  💰 ${property.price.toLocaleString("es-CO")}
                </Badge>
                {property.distance !== null &&
                  property.distance !== undefined && (
                    <Badge
                      variant="outline"
                      className="text-[10px] px-3 py-1 mt-2 ml-2"
                    >
                      📍 {property.distance.toFixed(1)} km
                    </Badge>
                  )}
                <div onClick={() => handleContact(property)}>
                  <Badge className="text-[10px] px-2 py-1 bg-[#7168D3] cursor-pointer hover:bg-[#5d57b5] transition-colors">
                    Contactar {property.user_type?.name || ""} 💬
                  </Badge>
                </div>
              </>
            ) : (
              <div className="mt-10">
                <Badge
                  onClick={() =>
                    profile?.onDelete && profile?.onDelete(property)
                  }
                  className="text-[10px] px-4 py-1 bg-red-500"
                >
                  {profile?.loadingDelete ? (
                    <Spinner className="mx-3" />
                  ) : (
                    " Eliminar"
                  )}
                </Badge>
              </div>
            )}

            {favorites ? (
              <div
                onClick={() => favorites.actionFavorite(property)}
                className="text-[10px] absolute -bottom-6 -right-2 px-3 py-1 cursor-pointer "
              >
                {profile?.loading ? (
                  <Spinner className="mx-3" />
                ) : favorites?.isProfile ? (
                  <IconDelete />
                ) : (
                  <IconSave />
                )}
              </div>
            ) : null}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
