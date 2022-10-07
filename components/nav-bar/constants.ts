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
  { key: "dashboard", label: Pages.dashboard, icon: IconDashboard },
  { key: "users", label: Pages.users, icon: IconUsers },
  { key: "shop", label: Pages.shop, icon: IconBuildingStore },
  { key: "orders", label: Pages.orders, icon: IconPackage },
  { key: "settings", label: Pages.settings, icon: IconSettings },
  { key: "logout", label: Pages.logout, icon: IconLogout },
];
