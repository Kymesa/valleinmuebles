"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

export function NavDocuments({ items }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{items[0]}</SidebarGroupLabel>
      <SidebarMenu>
        {items[1].map((item) => (
          <SidebarMenuItem key={item.name}>
            <NavLink to={item.url}>
              <SidebarMenuButton asChild>
                <div className="flex flex-row">
                  <item.icon />
                  <span className="">{item.name}</span>
                </div>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
