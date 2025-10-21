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

export const SectionCards = ({ post, profile }: any) => {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-b *:data-[slot=card]:shadow-[1px] *:data-[slot=card]:bg-[#7168D3]/10 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 rounded-md  border-none ">
      {post?.map((property) => (
        <Card
          key={property.id}
          className=" border-none  rounded-md w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:-translate-x-[5px] hover:-translate-y-[5px]"
        >
          <div className="relative  h-48 w-full rounded-md">
            <img
              src={property.images}
              alt={property.title}
              className="h-full w-full object-cover -translate-y-6 rounded-md"
            />
            <Badge className="text-[10px] absolute -top-2 left-2 px-3 py-1  bg-[#7168D3]">
              {property.operation_type_id.name}
            </Badge>
          </div>

          <CardHeader className="-translate-y-8">
            <CardTitle className="text-[14px] font-bold">
              {property.title}
            </CardTitle>
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
                <div>
                  <Badge className="text-[10px] px-2 py-1 bg-[#7168D3]">
                    Contactar {property.profileType} 💬
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
