// import ManageCoupon from "@/pages/Admin/ManageCoupon";
// import ManageParcel from "@/pages/Admin/ManageParcel";
// import ManageUser from "@/pages/Admin/ManageUser";
import TourPage from "@/src/app/(commonLayout)/tour/page";
import { ISidebarItems } from "@/src/types";
import { signOut } from "next-auth/react";
import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))
// const ManageCoupon = lazy(() => import("@/pages/Admin/ManageCoupon"))
// const ManageParcel = lazy(() => import("@/pages/Admin/ManageParcel"))
// const ManageUser = lazy(() => import("@/pages/Admin/ManageUser"))

export const adminSidebarItems: ISidebarItems[] = [
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
        title: "My profile",
        url: "/dashboard/my-profile",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Manage User",
        url: "/dashboard/admin/manage-user",
      },
      {
        title: "Manage Tour",
        url: "/dashboard/admin/manage-tour",
      },
      {
        title: "Manage Booking",
        url: "/dashboard/admin/manage-booking",
      },
    ],
  },
];
