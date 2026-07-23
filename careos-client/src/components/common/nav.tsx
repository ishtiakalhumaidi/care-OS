import { cookies } from "next/headers";
import { jwtUtils } from "@/lib/jwtUtils";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { NavClient } from "./NavClient";

export async function Nav() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const decodedToken = token ? jwtUtils.decodeEdgeSafe(token) : null;
  const role = decodedToken?.role as string | null;

  const isLoggedIn = !!role;
  const dashboardRoute = getDefaultDashboardRoute(role);

  return <NavClient isLoggedIn={isLoggedIn} dashboardRoute={dashboardRoute} />;
}
