import { SiteHeader } from "@/components/ui/dashboard/site-header";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconSparkles } from "@tabler/icons-react";
import {
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  Rocket,
  Star,
  ChartColumnIncreasing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Promote = () => {
  const features = [
    {
      icon: ChartColumnIncreasing,
      title: "Mayor Visibilidad",
      description:
        "Tus propiedades aparecerán en la parte superior de los resultados de búsqueda",
    },
    {
      icon: Target,
      title: "Mejor Público",
      description:
        "Llega a compradores realmente interesados en tu tipo de propiedad",
    },
    {
      icon: Zap,
      title: "Respuesta Rápida",
      description: "Obtén más contactos y respuestas en menos tiempo",
    },
    {
      icon: Star,
      title: "Badge Destacado",
      description:
        "Tu propiedad se mostrará con un badge especial de promoción",
    },
  ];

  const benefits = [
    "Aumenta 10x las vistas de tu propiedad",
    "Aparece en la página principal del sitio",
    "Posicionamiento prioritario en búsquedas",
    "Badge de 'Destacada' visible para todos",
    "Soporte prioritario de atención al cliente",
  ];

  return (
    <>
      <SiteHeader title="Promocionar Publicaciones" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-6 py-6 px-4 md:px-6 w-full max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7168D3] via-[#8168D3] to-[#9168D3] p-8 md:p-12">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                  <Badge className="bg-white/20 text-white border-none">
                    Próximamente
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Lleva tus propiedades <br />
                  al siguiente nivel
                </h1>
                <p className="text-white/90 text-lg mb-6 max-w-2xl">
                  Promociona tus publicaciones y alcance más potenciales
                  compradores. Esta funcionalidad llegará muy pronto con
                  herramientas profesionales para impulsar tus ventas.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-[#7168D3] hover:bg-gray-100"
                  disabled
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Disponible Pronto
                </Button>
              </div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-[#7168D3] transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#7168D3]/10">
                        <feature.icon className="h-6 w-6 text-[#7168D3]" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-[#7168D3]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-6 w-6 text-[#7168D3]" />
                  <CardTitle className="text-xl">
                    Beneficios de la Promoción
                  </CardTitle>
                </div>
                <CardDescription>
                  Todo lo que recibirás al promocionar tus propiedades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#7168D3] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Section */}
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <IconSparkles className="h-20 w-20 text-[#7168D3]" />
                </EmptyMedia>
                <EmptyTitle className="text-2xl">
                  Estamos trabajando en algo increíble
                </EmptyTitle>
                <EmptyDescription className="max-w-xl">
                  Muy pronto podrás promocionar tus propiedades con herramientas
                  profesionales de marketing. Esto te ayudará a vender más
                  rápido y llegar a más clientes potenciales.
                </EmptyDescription>
                <EmptyDescription className="text-sm text-gray-500">
                  ¿Tienes una propiedad que quieres destacar? Mantente atento a
                  las novedades.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="outline"
                  className="border-[#7168D3] text-[#7168D3] hover:bg-[#7168D3] hover:text-white"
                  disabled
                >
                  Ser notificado cuando esté disponible
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>
      </div>
    </>
  );
};
