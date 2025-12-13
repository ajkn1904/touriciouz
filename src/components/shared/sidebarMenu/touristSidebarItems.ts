import { signOut } from "next-auth/react";
import type { ISidebarItems } from "@/src/types";

export const touristSidebarItems: ISidebarItems[] = [
  {
    title: "TOURICIOUZ",
    items: [
      { title: "Home", url: "/" },

      { title: "Logout", onClick: () => signOut({ callbackUrl: "/login" }) },
    ],
  },
  {
    title: "Dashboard",
    items: [{ title: "My Profile", url: "/dashboard/my-profile" }],
  },
  {
    title: "Management",
    items: [{ title: "My Bookings", url: "/dashboard/tourist/my-booking" }],
  },
];
