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
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: TourPage
            },
        ]
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "Manage User",
                url: "/admin/manage-user",
                component: TourPage
            },
            {
                title: "Manage Parcel",
                url: "/admin/manage-parcel",
                component: TourPage,
            },
            {
                title: "Manage Coupon",
                url: "/admin/manage-coupon",
                component: TourPage
            },
        ]
    },
]