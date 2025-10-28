import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { toasts } from "../toast";
import { CATALOGS } from "@/constants/catalog";
import { HousePlug } from "lucide-react";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { profile } = useAuth();

  const typeProfile = profile?.user_type_id
    ? CATALOGS.TABLES.PROFILES[profile?.user_type_id]
    : null;

  const { isMobile } = useSidebar();
  const logoutApp = async () => {
    await supabase.auth.signOut();
    return toasts("Sesion cerrada con exito");
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:text-sidebar-accent-foreground outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <HousePlug className="size-5" color="#7168D3" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {typeProfile ? profile[typeProfile]?.full_name : null}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {typeProfile ? profile[typeProfile]?.email : null}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">V/par</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {typeProfile ? profile[typeProfile]?.full_name : null}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {typeProfile ? profile[typeProfile]?.email : null}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => logoutApp()}>
              <IconLogout className="hover:text-white" />
              Salir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
