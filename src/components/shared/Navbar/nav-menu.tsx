"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; 
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMenu = (props: NavigationMenuProps & { orientation?: "horizontal" | "vertical" }) => {
  const pathname = usePathname();
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/tour", label: "Tours" },
    { href: "/booking", label: "Booking" },
    { href: "/blog", label: "Blog" },
    { href: "/login", label: "Log In" },
    { href: "/register", label: "Register" },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className={`${
          props.orientation === "vertical"
            ? "flex flex-col gap-2"
            : "flex gap-3"
        } font-medium`}
      >
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};
