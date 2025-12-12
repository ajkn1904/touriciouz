/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getSession } from "next-auth/react";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface Booking {
  id: string;
  date: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;

  tour: {
    id: string;
    title: string;
    category: string;
    packagePrice: number;
    guideFee: number;
    durationDays: number;
    location: string;
    rating: number;
  };

  guide: {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      languages?: string[];
    };
  };

  tourist: {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      languages?: string[];
    };
  };

  payment: {
    id: string;
    amount: number;
    status: string;
    transactionId: string;
  };
}

export interface PaginatedBookings {
  data: Booking[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
    limit: number;
  };
}

const API_URL =
  `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/booking`;

async function getAuthHeaders() {
  const session = await getSession();
  if (!session?.user?.accessToken) throw new Error("No session found");

  return {
    Authorization: `Bearer ${session.user.accessToken}`,
    "Content-Type": "application/json",
  };
}

export const BookingService = {
  /** ============================
   *  🚀 Create Booking (Tourist)
   *  ============================ */
  createBooking: async (payload: { tourId: string; date: string }) => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Booking failed");
    }

    const data = await res.json();
    return data.data ?? data;
  },

  /** ======================================
   *  📌 Get My Bookings (Tourist, Guide, Admin)
   *  ====================================== */
  getMyBookings: async (query: Record<string, any> = {}): Promise<PaginatedBookings> => {
    const headers = await getAuthHeaders();
    const qs = new URLSearchParams(query).toString();

    const res = await fetch(`${API_URL}/my-bookings?${qs}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch bookings");
    }

    const data = await res.json();
    return {
      data: data.data || [],
      meta: data.meta,
    };
  },

  /** ===============================
   *  📍 Get Booking By ID
   *  =============================== */
  getBookingById: async (id: string): Promise<Booking> => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_URL}/${id}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch booking details");
    }

    const data = await res.json();
    return data.data ?? data;
  },

  /** ===============================
   *  🔥 Get All Bookings (Admin Only)
   *  =============================== */
  getAllBookings: async (
    query: Record<string, any> = {}
  ): Promise<PaginatedBookings> => {
    const headers = await getAuthHeaders();
    const qs = new URLSearchParams(query).toString();

    const res = await fetch(`${API_URL}?${qs}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch all bookings");
    }

    const data = await res.json();
    return {
      data: data.data || [],
      meta: data.meta,
    };
  },

  /** ===============================
   *  🔄 Update Booking Status
   *  =============================== */
  updateBookingStatus: async (id: string, status: BookingStatus) => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_URL}/status/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update status");
    }

    const data = await res.json();
    return data.data ?? data;
  },
};
