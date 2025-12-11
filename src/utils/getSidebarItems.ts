
import { role, TRole } from "../types";
import { adminSidebarItems } from "../components/shared/sidebarMenu/adminSidebarItems";
import { touristSidebarItems } from "../components/shared/sidebarMenu/touristSidebarItems";
import { guideSidebarItems } from "../components/shared/sidebarMenu/guideSidebarItems";


export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.ADMIN:
            return [...adminSidebarItems];
        case role.TOURIST:
            return [...touristSidebarItems];
        case role.GUIDE:
            return [...guideSidebarItems];
        default:
            return [];
    }
}