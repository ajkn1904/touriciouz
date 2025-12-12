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
    title: "Dashboard",
    items: [
      {
        title: "Create Tour",
        url: "/dashboard/guide/create-tour",
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "My Tours",
        url: "/dashboard/guide/guide-tour",
      },
    ],
  },
  {
    title: "Coupon Management",
    items: [
      {
        title: "Coupon",
        url: "/dashboard/guide/coupon",
      },
    ],
  },
];
