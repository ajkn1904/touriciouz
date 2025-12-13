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

// Helper function to get auth headers with content-type
async function getAuthHeaders() {
  const session = await getSession();
  if (!session?.user?.accessToken) {
    console.error("No session or access token found");
    throw new Error("No session found");
  }
  
  return { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.user.accessToken}`
  };
}

// Helper function for authenticated requests
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const session = await getSession();
  
  if (!session?.user?.accessToken) {
    console.error("No access token in session");
    throw new Error("No session found. Please login again.");
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.user.accessToken}`,
    ...options.headers,
  };

  console.log(`Making request to: ${url}`);
  console.log('Request headers:', headers);
  console.log('Request body:', options.body);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log('Response status:', response.status);
  return response;
}

export const BookingService = {
  /** ============================
   *  🚀 Create Booking (Tourist)
   *  ============================ */
  createBooking: async (payload: { tourId: string; date: string }): Promise<{ 
    booking: Booking; 
    paymentUrl: string 
  }> => {
    try {
      console.log("Creating booking with payload:", payload);
      
      // Validate payload
      if (!payload.tourId) {
        throw new Error("Tour ID is required");
      }
      
      if (!payload.date) {
        throw new Error("Date is required");
      }

      const res = await authenticatedFetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        console.error("Booking failed with status:", res.status);
        console.error("Error response:", responseData);
        throw new Error(responseData.message || `Booking failed with status ${res.status}`);
      }

      console.log("Booking successful:", responseData);
      return responseData.data || responseData;

    } catch (error: any) {
      console.error("Booking service error:", error);
      
      // Handle specific error cases
      if (error.message.includes("Tourist profile not found")) {
        throw new Error("Please complete your tourist profile before booking. Go to Profile -> Complete Tourist Profile.");
      }
      
      if (error.message.includes("No session found")) {
        throw new Error("Your session has expired. Please login again.");
      }
      
      throw error;
    }
  },

  /** ======================================
   *  📌 Get My Bookings (Tourist, Guide, Admin)
   *  ====================================== */
  getMyBookings: async (query: Record<string, any> = {}): Promise<PaginatedBookings> => {
    try {
      const qs = new URLSearchParams(query).toString();
      const url = `${API_URL}/my-bookings?${qs}`;
      
      console.log("Fetching bookings from:", url);

      const res = await authenticatedFetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch bookings:", errorText);
        throw new Error(`Failed to fetch bookings: ${res.status}`);
      }

      const data = await res.json();
      console.log("Bookings data received:", data);
      
      return {
        data: data.data || [],
        meta: data.meta || { total: 0, page: 1, totalPage: 1, limit: 10 },
      };
    } catch (error: any) {
      console.error("Error in getMyBookings:", error);
      throw new Error(error.message || "Failed to fetch bookings");
    }
  },

  /** ===============================
   *  📍 Get Booking By ID
   *  =============================== */
  getBookingById: async (id: string): Promise<Booking> => {
    try {
      if (!id) {
        throw new Error("Booking ID is required");
      }

      const res = await authenticatedFetch(`${API_URL}/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch booking:", errorText);
        throw new Error(`Failed to fetch booking details: ${res.status}`);
      }

      const data = await res.json();
      return data.data || data;
    } catch (error: any) {
      console.error("Error in getBookingById:", error);
      throw new Error(error.message || "Failed to fetch booking details");
    }
  },

  /** ===============================
   *  🔥 Get All Bookings (Admin Only)
   *  =============================== */
  getAllBookings: async (
    query: Record<string, any> = {}
  ): Promise<PaginatedBookings> => {
    try {
      const qs = new URLSearchParams(query).toString();
      const res = await authenticatedFetch(`${API_URL}?${qs}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch all bookings:", errorText);
        throw new Error(`Failed to fetch all bookings: ${res.status}`);
      }

      const data = await res.json();
      return {
        data: data.data || [],
        meta: data.meta || { total: 0, page: 1, totalPage: 1, limit: 10 },
      };
    } catch (error: any) {
      console.error("Error in getAllBookings:", error);
      throw new Error(error.message || "Failed to fetch all bookings");
    }
  },

  /** ===============================
   *  🔄 Update Booking Status
   *  =============================== */
  updateBookingStatus: async (id: string, status: BookingStatus) => {
    try {
      if (!id || !status) {
        throw new Error("Booking ID and status are required");
      }

      const res = await authenticatedFetch(`${API_URL}/status/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to update status:", errorText);
        throw new Error(`Failed to update status: ${res.status}`);
      }

      const data = await res.json();
      return data.data || data;
    } catch (error: any) {
      console.error("Error in updateBookingStatus:", error);
      throw new Error(error.message || "Failed to update booking status");
    }
  },
};