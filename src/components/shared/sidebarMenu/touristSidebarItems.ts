import TourPage from "@/src/app/(commonLayout)/tour/page";
import type { ISidebarItems } from "@/src/types";
import { lazy } from "react";

// const History = lazy(() => import("@/pages/tourist/History"))
// const Parcel = lazy(() => import("@/pages/tourist/Parcel"))


export const touristSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "History",
                url: "/tourist/history"
            },
        ]
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "Parcel",
                url: "/tourist/parcel",
            },
        ]
    }
]