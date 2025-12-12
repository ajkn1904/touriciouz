//import Coupon from "@/pages/guide/Coupon";
//import History from "@/pages/guide/History";
//import Parcel from "@/pages/guide/Parcel";

import { ISidebarItems } from "@/src/types";
import { lazy } from "react";

// const History = lazy(() => import("@/pages/guide/History"))
// const Parcel = lazy(() => import("@/pages/guide/Parcel"))
// const Coupon = lazy(() => import("@/pages/guide/Coupon"))

export const guideSidebarItems: ISidebarItems[] = [
      {
        title: "TOURICIOUZ",
        items: [
            {
                title: "Home",
                url: "/"
            },
        ]
    },
    {
    title: "Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/dashboard/guide/my-profile",
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
