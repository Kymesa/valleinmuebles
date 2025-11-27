import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

import { TrendingUp, Shield, Search, MapPin, ArrowRight } from "lucide-react";
import { HousePlug } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

import { SparklesCore } from "@/components/ui/sparkles";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FocusCards } from "@/components/ui/focus-cards";
import { Cover } from "@/components/ui/cover";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

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
    quote:
      "Encontré la casa perfecta en menos de una semana. Excelente asesoría y fotos muy profesionales.",
    name: "Laura Gómez",
    designation: "Casa en venta",
    src: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?q=80&w=2000&auto=format&fit=crop"
  },
  {
    quote:
      "El apartamento que arrendé supera mis expectativas. Todo el proceso fue rápido y seguro.",
    name: "Daniel Torres",
    designation: "Apartamento en arriendo",
    src: "https://images.pexels.com/photos/533157/pexels-photo-533157.jpeg"
  },
  {
    quote:
      "Gracias a la plataforma pude publicar mi local comercial y lo alquilaron en menos de 10 días.",
    name: "Sofía Hernández",
    designation: "Local comercial arrendado",
    src: "https://images.pexels.com/photos/15105668/pexels-photo-15105668.jpeg"
  },
  {
    quote:
      "Buscaba un estudio pequeño y moderno, y terminé consiguiendo exactamente lo que quería.",
    name: "Julián Castillo",
    designation: "Estudio amoblado",
    src: "https://img.freepik.com/foto-gratis/oficina-acogedora-hogar-estanterias-luz-natural_23-2151972926.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    quote:
      "Publicar mi finca fue sencillo y recibí varias ofertas en pocos días. La plataforma funciona excelente.",
    name: "Carolina Ruiz",
    designation: "Finca en venta",
    src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/163102645.jpg?k=1c8623aaae7daa6149ce95f46f06cc71e9d10af4bd731d2d21dfb3c28380099a&o="
  }
];



  const navItems = [
    {
      name: "Novedades",
      link: "#features",
    },
    {
      name: "Contactos",
      link: "#contact",
    },
  ];

  const cards = [
    {
      title: "Casas",
      src: "https://i.pinimg.com/236x/7a/70/11/7a701171c9ae5253f0c5fbbca7e0077b.jpg",
    },
    {
      title: "Rentas",
      src: "https://plus.unsplash.com/premium_photo-1683891068536-2467572c9a2b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "En venta",
      src: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg",
    },
    {
      title: "Apartamentos",
      src: "https://plus.unsplash.com/premium_photo-1674676471104-3c4017645e6f?q=80&w=670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Aparta estudio",
      src: "https://blog.jamar.com/wp-content/uploads/FOTO-APARTAESTUDIO-1200x1800.jpg",
    },
    {
      title: "Locales comerciales",
      src: "https://images.pexels.com/photos/34848153/pexels-photo-34848153.jpeg",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar>
        <NavBody>
          <div className="flex items-center gap-2">
            <div className="bg-[#7168D3] text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <HousePlug className="size-5" />
            </div>
            <span className="font-bold text-md text-gray-900">
              Valle Inmuebles
            </span>
          </div>
          {/* <NavbarLogo /> */}
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton onClick={() => navigate("/auth")} variant="secondary">
              <span>Iniciar</span>
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center gap-2">
              <div className="bg-[#7168D3] text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <HousePlug className="size-5" />
              </div>
              <span className="font-bold text-md text-gray-900">
                Valle Inmuebles
              </span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="w-full absolute ">
          <SparklesCore
            background="transparent"
            minSize={0.6}
            maxSize={1.2}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#7168D3"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Encuentra tu propiedad ideal en{" "}
              <Cover className="text-[#7168D3]">Valledupar</Cover>
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

      <section className=" bg-white container mx-auto px-4 py-14">
        <div className="w-full absolute ">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.2}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#7168D3"
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Valle Inmuebles?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia en la búsqueda y gestión de
            propiedades en Valledupar
          </p>
        </div>
        <HoverEffect items={features} />
      </section>

      <section className=" bg-white py-14">
        <div className="text-center mb-16 container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Propiedades destacadas
          </h2>
          <p className="text-xl text-gray-600">
            Descubre las mejores opciones disponibles en Valledupar
          </p>
        </div>
        <InfiniteMovingCards
          items={properties}
          direction="right"
          speed="normal"
        />

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
      </section>

      <section className=" bg-white container mx-auto px-4 py-14">
        <div className="w-full absolute ">
          <SparklesCore
            background="transparent"
            minSize={0.6}
            maxSize={1.2}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#7168D3"
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Todo tipo de propiedades
          </h2>
        </div>
        <FocusCards cards={cards} />
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="w-full absolute ">
          <SparklesCore
            background="transparent"
            minSize={0.6}
            maxSize={1.2}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#7168D3"
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600">
            Experiencias reales de personas que encontraron su hogar ideal
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />
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
            <PointerHighlight>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8"
                onClick={() => navigate("/auth")}
              >
                Explorar Propiedades
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </PointerHighlight>
            <PointerHighlight>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-white hover:bg-white "
                onClick={() => navigate("/auth")}
              >
                Iniciar Sesión
              </Button>
            </PointerHighlight>
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
    </>
  );
};
