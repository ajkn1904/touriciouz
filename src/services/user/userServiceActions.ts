/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { revalidate } from "@/src/utils/revalidate";
import { getSession } from "next-auth/react";

export interface User {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  profilePic?: string;
  bio?: string;
  languages?: string[];
  role: "ADMIN" | "GUIDE" | "TOURIST";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  guide?: {
    expertise: string[];
    dailyRate: number;
    rating?: number;
    totalTours?: number;
  };
}

const API_URL =
  `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/user`;

export const USER_TAG = "USER";

async function getAuthHeaders() {
  const session = await getSession();
  if (!session?.user?.accessToken) throw new Error("No session found");
  return { Authorization: `Bearer ${session.user.accessToken}` };
}

export const UserService = {
  getMe: async (): Promise<User> => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/me`, { 
      headers, 
      next: {
        tags: ["UseProfile"], 
      } 
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch profile");
    }
    const data = await res.json();
    return data.data ?? data;
  },

  updateMyProfile: async (payload: any, file?: File): Promise<User> => {
    const headers = await getAuthHeaders();
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (file) formData.append("file", file);

    const res = await fetch(`${API_URL}/my-profile`, {
      method: "PATCH",
      headers,
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update profile");
    }

    revalidate("UseProfile")
    const data = await res.json();
    return data.data ?? data;
  },

    /** Get all users (admin) */
  getAllUsers: async (): Promise<User[]> => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}`, { headers, cache: "no-store" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch users");
    }
    const data = await res.json();
    return data.data ?? data;
  },

  /** Get single user by ID (admin) */
  getUserById: async (id: string): Promise<User> => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/${id}`, { headers, cache: "no-store" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch user");
    }
    const data = await res.json();
    return data.data ?? data;
  },

  /** Update user role or status (admin) */
  updateUserRoleOrStatus: async (id: string, payload: any): Promise<User> => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/user-update/${id}`, {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update user");
    }
    const data = await res.json();
    return data.data ?? data;
  },
};
