import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        { title: "Dashboard", href: defaultDashboard, icon: "LayoutDashboard" },
        { title: "My Profile", href: "/my-profile", icon: "User" },
      ],
    },
  ];
};

export const superAdminNavItems: NavSection[] = [
  {
    title: "Platform Management",
    items: [
      { title: "Tenants", href: "/super-admin/tenants", icon: "Building2" },
      {
        title: "Global Billing",
        href: "/super-admin/billing",
        icon: "CreditCard",
      },
    ],
  },
];

export const ownerNavItems: NavSection[] = [
  {
    title: "Organization",
    items: [
      { title: "Branches", href: "/owner/branches", icon: "Network" },
      { title: "Center Admins", href: "/owner/admins", icon: "ShieldCheck" },
      {
        title: "Subscription",
        href: "/owner/subscription",
        icon: "CreditCard",
      },
    ],
  },
];

export const centerAdminNavItems: NavSection[] = [
  {
    title: "Daily Operations",
    items: [
      { title: "Live Ratios", href: "/admin/ratios", icon: "Activity" },
      { title: "Classrooms", href: "/admin/classrooms", icon: "Library" },
      { title: "Staff Roster", href: "/admin/staff", icon: "Users" },
      { title: "Enrollments", href: "/admin/enrollments", icon: "UserPlus" },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);
  switch (role) {
    case "SUPER_ADMIN":
      return [...commonNavItems, ...superAdminNavItems];
    case "TENANT_OWNER":
      return [...commonNavItems, ...ownerNavItems];
    case "CENTER_ADMIN":
      return [...commonNavItems, ...centerAdminNavItems];
    default:
      return commonNavItems;
  }
};
