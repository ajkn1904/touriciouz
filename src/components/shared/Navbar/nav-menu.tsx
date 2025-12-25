"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMenu = (props: NavigationMenuProps & { orientation?: "horizontal" | "vertical" }) => {
  const pathname = usePathname();
  const { data: session } = useSession(); 

  // Common menu items
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/tour", label: "Tours" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Auth menu items
  const authItems = session
    ? [
        { href: "/dashboard/my-profile", label: "Dashboard" },
        { onClick: () => signOut({ callbackUrl: "/login" }), label: "Logout" },
      ]
    : [
        { href: "/login", label: "Log In" }
      ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className={`${props.orientation === "vertical"
          ? "flex flex-col gap-2"
          : "flex gap-3"
          } font-medium`}
      >
        {/* Render common menu items */}
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={`btn btn-ghost rounded font-semibold font-serif hover:bg-green-600 hover:text-white ${
                  pathname === item.href ? "bg-green-600 text-white" : "text-black"
                }`}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        {/* Render auth menu items */}
        {authItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.href ? (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={`btn btn-ghost rounded font-semibold font-serif hover:bg-green-600 hover:text-white ${
                    pathname === item.href ? "bg-green-600 text-white" : "text-black"
                  }`}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            ) : (
              <button
                onClick={item.onClick}
                className="btn btn-ghost rounded font-semibold font-serif hover:bg-green-600 hover:text-white text-black p-1"
              >
                {item.label}
              </button>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
