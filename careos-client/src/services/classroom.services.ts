/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverApi } from "@/lib/api-client";

export interface IClassroom {
  id: string;
  name: string;
  ageGroup: string;
  legalCapacity: number;
  ratioLimit: number;
  branchId: string;
  branch?: { id: string; name: string };
  users?: IClassroomTeacher[];
  children?: IClassroomChildSummary[];
  _count?: { children: number; users: number };
}
export interface IClassroomTeacher {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface IClassroomChildSummary {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  status: string;
}

export interface ICreateClassroomPayload {
  name: string;
  ageGroup: string;
  legalCapacity: number;
  ratioLimit: number;
  branchId: string;
}

export interface IUpdateClassroomPayload {
  name?: string;
  ageGroup?: string;
  legalCapacity?: number;
  ratioLimit?: number;
  branchId?: string;
}

export const getClassrooms = async (queryString: string) => {
  try {
    const response = await serverApi.get(`/classrooms?${queryString}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch classrooms",
    );
  }
};

export const createClassroom = async (payload: ICreateClassroomPayload) => {
  try {
    const response = await serverApi.post("/classrooms", payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to create classroom",
    );
  }
};
export const getClassroomById = async (id: string) => {
  try {
    const response = await serverApi.get(`/classrooms/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch classroom",
    );
  }
};
export const getMyClassroom = async () => {
  try {
    const meRes = await serverApi.get("/users/me");
    const classroomId = meRes.data.data?.classroom?.id;
    if (!classroomId) return null;
    const response = await serverApi.get(`/classrooms/${classroomId}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch classroom",
    );
  }
};

export const assignTeacher = async (classroomId: string, userId: string) => {
  try {
    const response = await serverApi.post(
      `/classrooms/${classroomId}/assign-teacher`,
      { userId },
    );
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to assign teacher",
    );
  }
};

export const unassignTeacher = async (classroomId: string, userId: string) => {
  try {
    const response = await serverApi.delete(
      `/classrooms/${classroomId}/teachers/${userId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to unassign teacher",
    );
  }
};
export const updateClassroom = async (
  id: string,
  payload: IUpdateClassroomPayload,
) => {
  try {
    const response = await serverApi.patch(`/classrooms/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to update classroom",
    );
  }
};

export const deleteClassroom = async (id: string) => {
  try {
    const response = await serverApi.delete(`/classrooms/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to delete classroom",
    );
  }
};
