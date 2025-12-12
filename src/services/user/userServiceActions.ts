/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
    const res = await fetch(`${API_URL}/me`, { headers, cache: "no-store" });
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

    const data = await res.json();
    return data.data ?? data;
  },
};
