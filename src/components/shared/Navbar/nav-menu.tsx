"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger } from "@/src/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export const NavMenu = (props: NavigationMenuProps & { orientation?: "horizontal" | "vertical" }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Tour categories for mega menu
  const tourCategories = {
    "By Type": [
      { label: "Adventure Tours", href: "/tour?type=ADVENTURE" },
      { label: "Cultural Tours", href: "/tour?type=cultural" },
      { label: "Nature & Wildlife", href: "/tour?tourType=NATURE" },
      { label: "Luxury Travel", href: "/tour?type=luxury" },
      { label: "Family Packages", href: "/tour?type=family" },
    ]
  };

  // Common menu items
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/tour", label: "Tours" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  // For horizontal (desktop) navigation
  if (props.orientation === "horizontal") {
    return (
      <NavigationMenu {...props}>
        <NavigationMenuList className="flex gap-1 font-medium">
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={`px-4 py-2 font-semibold font-serif hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors ${pathname === "/" ? "bg-green-200 text-green-800" : ""
                  }`}
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Tours Mega Menu */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger className={`bg-transparent px-4 py-2 font-semibold font-serif hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors data-[state=open]:bg-green-50 data-[state=open]:text-green-700 ${pathname === "/tour" ? "bg-green-200 text-green-800" : ""
                    }`}>
              Tours
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-56 p-6">
                <div className="">
                  {Object.entries(tourCategories).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="font-bold text-green-700 text-lg mb-2 border-b pb-2">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 py-2 hover:bg-green-50 rounded-md transition-colors group"
                          >
                            <span className="group-hover:text-green-700">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <Link
                    href="/tour"
                    className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    All Tours
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          {/* Other menu items */}
          {menuItems.slice(1).map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={`px-4 py-2 font-semibold font-serif hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors ${pathname === item.href ? "bg-green-200 text-green-800" : ""
                    }`}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          {/* Dashboard link when logged in */}
          {session && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/dashboard/my-profile"
                  className={`px-4 py-2 font-semibold font-serif hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors flex items-center gap-2 ${pathname.startsWith("/dashboard") ? "bg-green-200 text-green-800" : ""
                    }`}
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {/* Auth buttons for desktop */}
          {!session ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/login"
                    className="px-4 py-2 font-semibold font-serif bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-lg transition-colors mx-2"
                  >
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/register"
                    className="px-4 py-2 font-semibold font-serif bg-white border border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    Register
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : <></>}
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // For vertical (mobile) navigation
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className="flex flex-col gap-2 font-medium"
      >
        {/* Main menu items for mobile */}
        {[
          { href: "/", label: "Home" },
          { href: "/tour", label: "Tours" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/faq", label: "FAQ" },
        ].map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold font-serif hover:bg-green-600 hover:text-white transition-colors ${pathname === item.href ? "bg-green-600 text-white" : "text-black"
                  }`}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        {/* Dashboard link when logged in (mobile) */}
        {session && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/dashboard/my-profile"
                className={`flex items-center gap-2 mx-2 px-4 py-3 rounded-lg font-semibold font-serif hover:bg-green-600 hover:text-white transition-colors ${pathname.startsWith("/dashboard") ? "bg-green-600 text-white" : "text-black"
                  }`}
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        {/* Auth buttons for mobile */}
        <NavigationMenuItem className="mt-4 pt-4 px-4 border-t border-gray-200">
          {session ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Logout
            </Button>
          ) : (
            <div className="space-y-2">
              <Link href="/login" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-green-600 text-green-600 hover:bg-green-50">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};