/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/api-client";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    const { data } = await res.json();
    const { accessToken, refreshToken: newRefreshToken, token } = data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }
    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }
    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    }
    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
export interface IInviteUserPayload {
  email: string;
  role: "CENTER_ADMIN" | "TEACHER" | "GUARDIAN";
  branchId: string;
  classroomId?: string;
  childId?: string;
  relationship?: string;
}

export interface IAcceptInvitePayload {
  token: string;
  name: string;
  password: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface IInvitation {
  id: string;
  email: string;
  role: string;
  status: "PENDING" | "ACCEPTED" | "EXPIRED";
  branchId?: string;
  expiresAt: string;
  createdAt: string;
}

export const inviteUser = async (payload: IInviteUserPayload) => {
  try {
    const response = await serverApi.post("/auth/invite", payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to send invitation",
    );
  }
};

export const acceptInvite = async (payload: IAcceptInvitePayload) => {
  try {
    const response = await serverApi.post("/auth/accept-invite", payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to accept invitation",
    );
  }
};

export const forgotPassword = async (payload: IForgotPasswordPayload) => {
  try {
    const response = await serverApi.post("/auth/forgot-password", payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to send reset code",
    );
  }
};

export const resetPassword = async (payload: IResetPasswordPayload) => {
  try {
    const response = await serverApi.post("/auth/reset-password", payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to reset password",
    );
  }
};
export const getInvitations = async (queryString: string) => {
  try {
    const response = await serverApi.get(`/auth/invitations?${queryString}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch invitations",
    );
  }
};

export const revokeInvitation = async (id: string) => {
  try {
    const response = await serverApi.delete(`/auth/invitations/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to revoke invitation",
    );
  }
};
