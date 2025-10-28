import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Home,
  TrendingUp,
  Shield,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Eye,
  Star,
} from "lucide-react";
import { HousePlug } from "lucide-react";

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description:
        "Encuentra la propiedad perfecta con filtros inteligentes y búsqueda personalizada.",
    },
    {
      icon: MapPin,
      title: "Ubicación Estratégica",
      description:
        "Propiedades en las mejores zonas de Valledupar y sus alrededores.",
    },
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description:
        "Verificación completa de propiedades y transacciones seguras.",
    },
    {
      icon: Clock,
      title: "Respuesta Rápida",
      description:
        "Atención al cliente disponible las 24 horas para resolver tus dudas.",
    },
  ];

  const properties = [
    {
      image: "/login-1.jpg",
      type: "Casa",
      location: "Zona Centro",
      price: "$350.000.000",
      beds: 3,
      baths: 2,
      sqft: 120,
    },
    {
      image: "/login-2.jpg",
      type: "Apartamento",
      location: "Bella Vista",
      price: "$280.000.000",
      beds: 2,
      baths: 2,
      sqft: 90,
    },
    {
      image: "/login-3.jpeg",
      type: "Casa",
      location: "Altos de Caracoli",
      price: "$420.000.000",
      beds: 4,
      baths: 3,
      sqft: 180,
    },
  ];

  const testimonials = [
    {
      name: "María Rodríguez",
      location: "Compradora",
      comment:
        "Excelente servicio, encontré mi casa soñada en tiempo récord. Muy recomendados.",
      rating: 5,
    },
    {
      name: "Carlos Vega",
      location: "Arrendador",
      comment:
        "Proceso muy rápido y profesional. La plataforma es fácil de usar y muy intuitiva.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      location: "Compradora",
      comment:
        "La mejor experiencia en búsqueda de propiedades. El equipo es muy atento y eficiente.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#7168D3] text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <HousePlug className="size-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Valle Inmuebles
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="hidden md:flex"
            >
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-[#7168D3] hover:bg-[#5d57b5]"
            >
              Explorar Propiedades
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-[#7168D3]/10 text-[#7168D3] px-4 py-2 rounded-full text-sm font-medium">
                Tu hogar soñado en Valledupar
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Encuentra tu propiedad ideal en{" "}
              <span className="text-[#7168D3]">Valledupar</span>
            </h1>
            <p className="text-xl text-gray-600">
              La plataforma líder en venta y arriendo de inmuebles en la capital
              del Cesar. Miles de propiedades verificadas esperando por ti.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#7168D3] hover:bg-[#5d57b5] h-12 px-8"
                onClick={() => navigate("/auth")}
              >
                Empezar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8"
                onClick={() => navigate("/auth")}
              >
                Ver propiedades
              </Button>
            </div>
            <div className="flex gap-8 pt-6">
              <div>
                <div className="text-3xl font-bold text-[#7168D3]">500+</div>
                <div className="text-gray-600">Propiedades</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#7168D3]">1000+</div>
                <div className="text-gray-600">Clientes satisfechos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#7168D3]">98%</div>
                <div className="text-gray-600">Tasa de éxito</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/login-1.jpg"
                alt="Propiedades en Valledupar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-[#7168D3]/10 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#7168D3]" />
                </div>
                <div>
                  <div className="font-bold text-lg">+25%</div>
                  <div className="text-sm text-gray-600">
                    Crecimiento mensual
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Valle Inmuebles?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia en la búsqueda y gestión de
            propiedades en Valledupar
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-[#7168D3]/50 transition-colors"
            >
              <CardHeader>
                <div className="bg-[#7168D3]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-[#7168D3]" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propiedades destacadas
            </h2>
            <p className="text-xl text-gray-600">
              Descubre las mejores opciones disponibles en Valledupar
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/90"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/90"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#7168D3] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <CardTitle className="text-2xl text-[#7168D3]">
                    {property.price}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>{property.beds} Hab</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>{property.baths} Baños</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>{property.sqft} m²</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#7168D3] hover:bg-[#5d57b5]">
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="px-8"
            >
              Ver todas las propiedades
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600">
            Experiencias reales de personas que encontraron su hogar ideal
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "{testimonial.comment}"
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#7168D3] to-[#5d57b5] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para encontrar tu próxima propiedad?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya confiaron en nosotros para
            encontrar el lugar perfecto
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8"
              onClick={() => navigate("/auth")}
            >
              Explorar Propiedades
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-white hover:bg-white "
              onClick={() => navigate("/auth")}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#7168D3] flex size-8 items-center justify-center rounded-md">
                  <HousePlug className="size-5 text-white" />
                </div>
                <span className="font-bold text-xl">Valle Inmuebles</span>
              </div>
              <p className="text-gray-400">
                Tu plataforma de confianza para encontrar la propiedad perfecta
                en Valledupar.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Compañía</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Nosotros</li>
                <li>Contacto</li>
                <li>Carreras</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Centro de ayuda</li>
                <li>Guías</li>
                <li>API</li>
                <li>Documentación</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Términos</li>
                <li>Privacidad</li>
                <li>Cookies</li>
                <li>Licencias</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Valle Inmuebles. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
