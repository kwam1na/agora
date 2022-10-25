import {
  IconSettings,
  IconUsers,
  IconBuildingStore,
  IconDashboard,
  IconPackage,
  IconLogout,
} from "@tabler/icons";
import { Pages } from "@/constants";

export const linksData = [
  { href: "/dashboard", label: Pages.dashboard, icon: IconDashboard },
  { href: "/users", label: Pages.users, icon: IconUsers },
  { href: "/shop", label: Pages.shop, icon: IconBuildingStore },
  { href: "/orders", label: Pages.orders, icon: IconPackage },
  { href: "/settings", label: Pages.settings, icon: IconSettings },
  { href: "/signin", label: Pages.logout, icon: IconLogout },
];
