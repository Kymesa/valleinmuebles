import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSettings,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";

import { NavUser } from "./nav-user";
import { Label } from "../label";
import { HousePlug } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "../LoadingScreen";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Descubrir",
      url: "#",
      icon: IconDashboard,
    },
  ],

  help: [
    "Configuraciones",
    [
      {
        name: "Configuraciones",
        url: "#",
        icon: IconSettings,
      },
      {
        name: "Necesito ayuda",
        url: "#",
        icon: IconHelp,
      },
    ],
  ],
  1: [
    "Usuario",
    [
      {
        name: "Mi cuenta",
        url: "#",
        icon: IconDatabase,
      },

      {
        name: "Propiedades favoritas",
        url: "#",
        icon: IconFileWord,
      },
      {
        name: "Mensajes",
        url: "#",
        icon: IconDatabase,
      },

      {
        name: "Notificaciones",
        url: "#",
        icon: IconFileWord,
      },
    ],
  ],
  2: [
    "Propetario",
    [
      {
        name: "Mi cuenta",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Publicaciones",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Estadisticas",
        url: "#",
        icon: IconChartBar,
      },
      {
        name: "Propiedades favoritas",
        url: "#",
        icon: IconFileWord,
      },
      {
        name: "Mensajes",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Notificaciones",
        url: "#",
        icon: IconFileWord,
      },
    ],
  ],
  3: [
    "Inmobiliaria",
    [
      {
        name: "Mi cuenta",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Publicaciones",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Promocionar publicaciones",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Estadisticas",
        url: "#",
        icon: IconChartBar,
      },
      {
        name: "Propiedades favoritas",
        url: "#",
        icon: IconFileWord,
      },
      {
        name: "Mensajes",
        url: "#",
        icon: IconDatabase,
      },

      {
        name: "Notificaciones",
        url: "#",
        icon: IconFileWord,
      },
    ],
  ],
  admin: [
    "Adminstrador",
    [
      {
        name: "Estadisticas",
        url: "#",
        icon: IconChartBar,
      },
      {
        name: "Notificaciones",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Control de usuarios",
        url: "#",
        icon: IconFileWord,
      },
      {
        name: "Control de contenido",
        url: "#",
        icon: IconDatabase,
      },
    ],
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useAuth();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {!profile?.user_type_id ? <LoadingScreen /> : null}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a className="flex items-center gap-2 font-medium">
                <div className="bg-[#7168D3] text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <HousePlug className="size-4" />
                </div>
                <Label className="font-bold text-lg">Valle inmuebles</Label>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data[String(profile?.user_type_id ?? 1)] as any} />
        {/* <NavDocuments items={data.admin as any} /> */}
        <NavDocuments items={data.help as any} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
