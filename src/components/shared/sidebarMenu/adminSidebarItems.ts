// import ManageCoupon from "@/pages/Admin/ManageCoupon";
// import ManageParcel from "@/pages/Admin/ManageParcel";
// import ManageUser from "@/pages/Admin/ManageUser";
import TourPage from "@/src/app/(commonLayout)/tour/page";
import { ISidebarItems } from "@/src/types";
import { lazy } from "react";


// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))
// const ManageCoupon = lazy(() => import("@/pages/Admin/ManageCoupon"))
// const ManageParcel = lazy(() => import("@/pages/Admin/ManageParcel"))
// const ManageUser = lazy(() => import("@/pages/Admin/ManageUser"))

export const adminSidebarItems: ISidebarItems[] = [
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
                title: "My profile",
                url: "/admin/my-profile"
            },
        ]
    },
    {
        title: "Management",
        items: [
            {
                title: "Manage User",
                url: "/admin/manage-user"
            },
            {
                title: "Manage Tour",
                url: "/admin/manage-tour",
            },
            {
                title: "Manage Booking",
                url: "/admin/manage-booking"
            },
        ]
    },
]