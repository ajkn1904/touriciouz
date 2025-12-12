//import Coupon from "@/pages/guide/Coupon";
//import History from "@/pages/guide/History";
//import Parcel from "@/pages/guide/Parcel";

import { ISidebarItems } from "@/src/types";
import { signOut } from "next-auth/react";
import { lazy } from "react";

// const History = lazy(() => import("@/pages/guide/History"))
// const Parcel = lazy(() => import("@/pages/guide/Parcel"))
// const Coupon = lazy(() => import("@/pages/guide/Coupon"))

export const guideSidebarItems: ISidebarItems[] = [
  {
    title: "TOURICIOUZ",
    items: [
      { title: "Home", url: "/" },

      { title: "Logout", onClick: () => signOut({ callbackUrl: "/login" }) },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/dashboard/my-profile",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "All Tours",
        url: "/dashboard/guide/guide-tour",
      },
      {
        title: "Add Tour",
        url: "/dashboard/guide/create-tour",
      },
      {
        title: "Bookings",
        url: "/dashboard/guide/tourist-booking",
      },
    ],
  },
];
