export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  TENANT_OWNER = "TENANT_OWNER",
  CENTER_ADMIN = "CENTER_ADMIN",
  TEACHER = "TEACHER",
  GUARDIAN = "GUARDIAN",
}

export const roleDashboardRouteMap: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: "/admin/dashboard",
  [UserRole.TENANT_OWNER]: "/owner/dashboard",
  [UserRole.CENTER_ADMIN]: "/center-admin/dashboard",
  [UserRole.TEACHER]: "/teacher/dashboard",
  [UserRole.GUARDIAN]: "/guardian/dashboard",
};

export const getDefaultDashboardRoute = (role: string | null): string => {
  if (!role || !roleDashboardRouteMap[role as UserRole]) {
    return "/login";
  }
  return roleDashboardRouteMap[role as UserRole];
};

export const isAuthRoute = (pathname: string): boolean => {
  const authRoutes = [
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/accept-invite",
    "/reset-password",
  ];
  return authRoutes.some((route) => pathname.startsWith(route));
};

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
  if (pathname.startsWith("/admin")) return UserRole.SUPER_ADMIN;
  if (pathname.startsWith("/owner")) return UserRole.TENANT_OWNER;
  if (pathname.startsWith("/center-admin")) return UserRole.CENTER_ADMIN;
  if (pathname.startsWith("/teacher")) return UserRole.TEACHER;
  if (pathname.startsWith("/guardian")) return UserRole.GUARDIAN;

  if (
    pathname.startsWith("/my-profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/change-password")
  ) {
    return "COMMON";
  }
  return null;
};
