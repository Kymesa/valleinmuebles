import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const { profile } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {profile?.user_type_id === 2 || profile?.user_type_id === 3 ? (
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-[#7168D3] text-primary-foreground hover:bg-[#7168D3] hover:text-primary-foreground active:bg-[#7168D3] active:text-primary-foreground min-w-8 shadow-md shadow-indigo-500/40 duration-200 h-9 ease-linear cursor-pointer "
              >
                <NavLink
                  to={"/create-post"}
                  className="flex flex-row items-center gap-x-2 "
                >
                  <IconCirclePlusFilled />
                  <span className="text-white">Crear publicacion</span>
                </NavLink>
              </SidebarMenuButton>
            ) : null}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink to={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
