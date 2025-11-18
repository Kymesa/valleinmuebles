import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

import { toasts } from "./toast";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { CATALOGS } from "@/constants/catalog";
const API = import.meta.env.VITE_API;

export const RegisterForm = ({ ...props }: React.ComponentProps<"div">) => {
  const [selectedUserTypeId, setSelectedUserTypeId] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signUpWithEmail = async () => {
    if (!email && !password && !fullName) {
      return toasts("Campos incompletos");
    }

    if (password.length <= 5) {
      return toasts("La contraseña debe tener mas de 6 caracteres");
    }

    if (fullName.length <= 3) {
      return toasts("El nombre debe tener mas de 3 caracteres");
    }

    setLoading(true);

    try {
      const resp = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const respApi = await resp.json();

      if (respApi?.status === "error") {
        return toasts(respApi?.message);
      }

      if (respApi?.status === "success") {
        localStorage.setItem("@token", respApi?.access_token);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        await supabase.from("users_extended").insert({
          id: data.user.id,
          user_type_id: selectedUserTypeId,
          auth_provider: data.user.app_metadata.provider,
          profile_completed: false,
        });

        await supabase
          .from(CATALOGS.TABLES.PROFILES[selectedUserTypeId])
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
          })
          .select()
          .single();

        setLoading(false);
        setEmail("");
        setPassword("");

        window.location.reload();
        if (error) {
          return toasts("No se pudo resolver tu solicitud");
        }

        if (data) {
          return toasts("Se creo la cuenta correctamente e inicia sesion");
        }
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div {...props} className="mt-4">
      <FieldGroup>
        <div className="flex flex-col items-center text-center gap-y-2">
          <Label className="font-bold text-2xl">Registrarse para empezar</Label>
          <Label subtitle>
            En Valle inmuebles nos comprometos en encontrar tu lugar ideal
          </Label>
        </div>

        <RadioGroup
          onValueChange={(i: any) => setSelectedUserTypeId(i)}
          defaultValue="1"
          className="flex flex-row"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="1" id="r1" />
            <Label htmlFor="r1">Usuario</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="2" id="r2" />
            <Label htmlFor="r2">Propetario</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="3" id="r3" />
            <Label htmlFor="r3">Inmobiliaria</Label>
          </div>
        </RadioGroup>

        <Field>
          <FieldLabel htmlFor="email">
            Nombre completo / Razon social
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Inmobiliaria del valle  / nombre"
            required
            inputMode="email"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Correo</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            required
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            placeholder="Contraseña"
            type="password"
            required
            inputMode="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field>
          <Button loading={loading} onClick={() => signUpWithEmail()}>
            Registrase
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
};
