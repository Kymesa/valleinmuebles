import { HousePlug } from "lucide-react";
import { LoginForm } from "@/components/ui/login-form";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/ui/register-form";

export const Login = () => {
  const images = ["/login-1.jpg", "/login-2.jpg", "/login-3.jpeg"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 100);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a className="flex items-center gap-2 font-medium">
            <div className="bg-[#7168D3] text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <HousePlug className="size-4" />
            </div>

            <Label className="font-bold text-lg">Valle inmuebles</Label>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex-col gap-6">
            <Tabs defaultValue="login">
              <TabsList className="self-center px-2 py-1">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block overflow-hidden ">
        <img
          src={images[currentIndex]}
          alt="Background"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};
