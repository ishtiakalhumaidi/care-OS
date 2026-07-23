/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverApi } from "@/lib/api-client";

export interface IUpdateTenantPayload {
  name?: string;
  planId?: string;
}

export interface ISuspendTenantPayload {
  reason?: string;
}

export interface ITenantPlan {
  id: string;
  name: string;
  maxBranches: number;
  [key: string]: any;
}

export interface ITenantBranch {
  id: string;
  name: string;
  address: string;
  timezone?: string;
  isActive: boolean;
}

export interface ITenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  isActive: boolean;
  contactEmail?: string | null;
  contactPhone?: string | null;
  website?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  timezone: string;
  currency: string;
  taxId?: string | null;
  planId?: string | null;
  suspendedAt?: string | null;
  suspensionReason?: string | null;
  createdAt: string;
  updatedAt?: string;
  plan?: ITenantPlan | null;
  branches?: ITenantBranch[];
  _count?: { branches: number; users: number; invitations: number; children: number };
}

export interface IMembersByRole {
  role: string;
  count: number;
}

export interface IInvitationsByStatus {
  status: string;
  count: number;
}

export interface ITenantAnalytics {
  tenant: ITenant;
  membersByRole: IMembersByRole[];
  invitationsByStatus: IInvitationsByStatus[];
}
export const getAllTenants = async (queryString: string) => {
  try {
    const response = await serverApi.get(`/tenants?${queryString}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch tenants");
  }
};
export const getTenantById = async (id: string) => {
  try {
    const response = await serverApi.get(`/tenants/${id}`);
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "Unknown error";
    console.error(`getTenantById failed (status: ${status ?? "no response"}): ${message}`);
    throw new Error(message);
  }
};

export const updateTenant = async (id: string, formData: FormData) => {
  try {
    const response = await serverApi.patch(`/tenants/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update tenant");
  }
};

export const suspendTenant = async (
  id: string,
  payload: ISuspendTenantPayload,
) => {
  try {
    const response = await serverApi.patch(`/tenants/${id}/suspend`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to suspend tenant",
    );
  }
};

export const activateTenant = async (id: string) => {
  try {
    const response = await serverApi.patch(`/tenants/${id}/activate`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to activate tenant",
    );
  }
};

export const getTenantAnalytics = async (id: string) => {
  try {
    const response = await serverApi.get(`/tenants/${id}/analytics`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch tenant analytics",
    );
  }
};
