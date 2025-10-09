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

const properties = [
  {
    id: 1,
    title: "Apartamento moderno en palmeto",
    type: "Venta",
    price: 320000000,
    address: "Calle 19 #5-20, Valledupar, Cesar",
    description:
      "Apartamento de 3 habitaciones, 2 baños, excelente iluminación y cerca de zonas comerciales.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    profileType: "Propietario",
    bedrooms: 3,
    bathrooms: 2,
    area_m2: 120,
  },
  {
    id: 2,
    title: "Casa amplia en conjunto cerrado Brasil",
    type: "Arriendo",
    price: 2500000,
    address: "Carrera 12 #34-56, Valledupar, Cesar",
    description:
      "Casa familiar con patio grande, 4 habitaciones y 3 baños, ideal para familias.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    profileType: "Inmobiliaria",
    bedrooms: 4,
    bathrooms: 3,
    area_m2: 200,
  },
  {
    id: 3,
    title: "Local comercial en CC Mayales",
    type: "Arriendo",
    price: 4000000,
    address: "Calle 15 #7-12, Valledupar, Cesar",
    description:
      "Local amplio para negocios, excelente visibilidad, cerca de avenidas principales.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    profileType: "Inmobiliaria",
    bedrooms: 0,
    bathrooms: 1,
    area_m2: 80,
  },
  {
    id: 4,
    title: "Apartamento nuevo en Buenos Aires",
    type: "Venta",
    price: 280000000,
    address: "Carrera 10 #21-30, Valledupar, Cesar",
    description:
      "Apartamento moderno con balcón, 2 habitaciones y 2 baños, cerca de colegios y supermercados.",
    image:
      "https://images.unsplash.com/photo-1759239355404-63313f92cfc2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profileType: "Propietario",
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 95,
  },
  {
    id: 5,
    title: "Apartamento moderno en palmeto",
    type: "Venta",
    price: 320000000,
    address: "Calle 19 #5-20, Valledupar, Cesar",
    description:
      "Apartamento de 3 habitaciones, 2 baños, excelente iluminación y cerca de zonas comerciales.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    profileType: "Propietario",
    bedrooms: 3,
    bathrooms: 2,
    area_m2: 120,
  },
  {
    id: 6,
    title: "Casa amplia en conjunto cerrado Brasil",
    type: "Arriendo",
    price: 2500000,
    address: "Carrera 12 #34-56, Valledupar, Cesar",
    description:
      "Casa familiar con patio grande, 4 habitaciones y 3 baños, ideal para familias.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    profileType: "Inmobiliaria",
    bedrooms: 4,
    bathrooms: 3,
    area_m2: 200,
  },
  {
    id: 7,
    title: "Local comercial en CC Mayales",
    type: "Arriendo",
    price: 4000000,
    address: "Calle 15 #7-12, Valledupar, Cesar",
    description:
      "Local amplio para negocios, excelente visibilidad, cerca de avenidas principales.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    profileType: "Inmobiliaria",
    bedrooms: 0,
    bathrooms: 1,
    area_m2: 80,
  },
  {
    id: 8,
    title: "Apartamento nuevo en Buenos Aires",
    type: "Venta",
    price: 280000000,
    address: "Carrera 10 #21-30, Valledupar, Cesar",
    description:
      "Apartamento moderno con balcón, 2 habitaciones y 2 baños, cerca de colegios y supermercados.",
    image:
      "https://images.unsplash.com/photo-1759239355404-63313f92cfc2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profileType: "Propietario",
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 95,
  },
];

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-b *:data-[slot=card]:shadow-[1px] *:data-[slot=card]:bg-[#7168D3]/10 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 rounded-md  border-none ">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="transition-shadow border-none  rounded-md"
        >
          <div className="relative  h-48 w-full rounded-md">
            <img
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover -translate-y-6 rounded-md"
            />
            <Badge className="text-[10px] absolute -top-2 left-2 px-3 py-1  bg-[#7168D3]">
              {property.type}
            </Badge>
          </div>

          <CardHeader className="-translate-y-8">
            <CardTitle className="text-[14px] font-bold">
              {property.title}
            </CardTitle>
            <CardDescription className="text-[12px] text-muted-foreground line-clamp-2">
              {property.description}
            </CardDescription>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-1 -translate-y-10">
            <div className="flex items-center gap-x-2 text-[10px] text-muted-foreground">
              <IconMapPin className="w-4 h-4" />
              {property.address}
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
                  {property.profileType}
                </Badge>
              </CardAction>
            </div>

            <Badge className="text-[10px] px-3 py-1 mt-2 bg-[#7168D3]">
              💰 ${property.price.toLocaleString("es-CO")}
            </Badge>
            <div>
              <Badge className="text-[10px] px-2 py-1 bg-[#7168D3]">
                Contactar {property.profileType} 💬
              </Badge>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
