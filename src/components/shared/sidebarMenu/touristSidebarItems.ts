import TourPage from "@/src/app/(commonLayout)/tour/page";
import type { ISidebarItems } from "@/src/types";
import { lazy } from "react";

// const History = lazy(() => import("@/pages/tourist/History"))
// const Parcel = lazy(() => import("@/pages/tourist/Parcel"))

export const touristSidebarItems: ISidebarItems[] = [
  {
    title: "TOURICIOUZ",
    items: [
      {
        title: "Home",
        url: "/",
      },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/dashboard/tourist/my-profile",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "My Bookings",
        url: "/dashboard/tourist/booking",
      },
    ],
  },
];
