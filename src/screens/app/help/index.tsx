import { SiteHeader } from "@/components/ui/dashboard/site-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export const Help = () => {
  return (
    <>
      <SiteHeader title="Ayuda" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-[80%]  mx-auto">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>¿ Valle inmuebles ?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    Nuestra plataforma conecta propietarios, inmobiliarias y
                    usuarios en un solo lugar. Los dueños y agencias pueden
                    publicar sus inmuebles, mientras que los usuarios pueden
                    explorar, comparar y contactar fácilmente para encontrar su
                    próximo hogar o inversión.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Guía de uso</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    Explica de forma simple cómo funciona la plataforma según el
                    tipo de usuario: Dueños / Inmobiliarias: cómo crear una
                    cuenta, publicar un inmueble, editar o eliminar
                    publicaciones. Usuarios: cómo buscar inmuebles, filtrar
                    resultados, guardar favoritos, o contactar al anunciante. 💡
                    Tip: Puedes acompañar esto con imágenes o videos cortos.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Seguridad y Confianza</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  Se usa HTTPS y cifrado de contraseñas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Términos y Condiciones</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    Responsabilidad del contenido publicado (los dueños e
                    inmobiliarias son responsables de sus anuncios). Prohibición
                    de publicar información falsa o fraudulenta. Reglas de uso
                    (respetar la plataforma, no hacer spam, etc.). Derechos de
                    la plataforma para suspender cuentas en caso de mal uso.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Contacto o Soporte</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>📧 kymesa@unicesar.edu.co 📞 (+57) 324 240 8140</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Política de Privacidad</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    En nuestra plataforma recopilamos información como nombre,
                    correo electrónico y datos del inmueble que el usuario desee
                    publicar. Esta información se usa únicamente para brindar un
                    mejor servicio dentro de la app, permitir la comunicación
                    entre usuarios e inmobiliarias, y mantener la seguridad de
                    las cuentas. No compartimos datos personales con terceros
                    sin consentimiento del usuario.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};
