
//import Coupon from "@/pages/guide/Coupon";
//import History from "@/pages/guide/History";
//import Parcel from "@/pages/guide/Parcel";
import TourPage from "@/src/app/(commonLayout)/tour/page";
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
                    title: "History",
                    url: "/guide/history",
                    component: TourPage
                },
            ]
        },
        {
            title: "Parcel Management",
            items: [
                {
                    title: "Parcel",
                    url: "/guide/parcel",
                    component: TourPage,
                },
            ]
        },
        {
            title: "Coupon Management",
            items: [
                {
                    title: "Coupon",
                    url: "/guide/coupon",
                    component: TourPage,
                },
            ]
        },
    ]