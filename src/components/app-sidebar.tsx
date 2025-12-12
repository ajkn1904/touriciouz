/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { getSidebarItems } from "../utils/getSidebarItems";
import { TRole } from "../types";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const navMain = getSidebarItems(session?.user.role as TRole);
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarContent className="pt-20">
        {navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-lg font-bold uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: any) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`${isActive
                            ? "text-primary dark:text-foreground font-semibold border-b-2 border-b-primary hover:border-b-primary"
                            : "text-muted-foreground hover:text-primary dark:text-muted-foreground"
                          }`}
                      >
                        {item.url ? (
                          <Link href={item.url}>{item.title}</Link>
                        ) : item.onClick ? (
                          <button type="button" onClick={item.onClick} className="w-full text-left">
                            {item.title}
                          </button>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
