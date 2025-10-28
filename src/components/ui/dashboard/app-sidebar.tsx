import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconReport,
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
      url: "/dashboard",
      icon: IconDashboard,
    },
  ],

  help: [
    "Configuraciones",
    [
      {
        name: "Necesito ayuda",
        url: "/help",
        icon: IconHelp,
      },
    ],
  ],
  1: [
    "Usuario",
    [
      {
        name: "Mi cuenta",
        url: "/profile",
        icon: IconDatabase,
      },
      {
        name: "Propiedades favoritas",
        url: "/favorites",
        icon: IconFileWord,
      },
    ],
  ],
  2: [
    "Propetario",
    [
      {
        name: "Mi cuenta",
        url: "/profile",
        icon: IconDatabase,
      },
      {
        name: "Publicaciones",
        url: "/post",
        icon: IconReport,
      },
      {
        name: "Propiedades favoritas",
        url: "/favorites",
        icon: IconFileWord,
      },
    ],
  ],
  3: [
    "Inmobiliaria",
    [
      {
        name: "Mi cuenta",
        url: "/profile",
        icon: IconDatabase,
      },
      {
        name: "Publicaciones",
        url: "/post",
        icon: IconReport,
      },
      {
        name: "Promocionar publicaciones",
        url: "/favorites",
        icon: IconReport,
      },

      {
        name: "Propiedades favoritas",
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
        name: "Control de usuarios",
        url: "#",
        icon: IconFileWord,
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
