"use server";
import { revalidateTag } from "next/cache";

interface GetAllToursParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

export async function getAllTours({
  page = 1,
  limit = 10,
  search,
  category,
  sort,
  minPrice,
  maxPrice,
  location,
}: GetAllToursParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  // Add search term
  if (search) params.append("searchTerm", search);
  
  // Add category
  if (category) params.append("category", category);
  
  // Add location
  if (location) params.append("location", location);
  
  // Add price range
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
  
  // Add sort parameters
  if (sort) {
    if (sort === "createdAt" || sort === "-createdAt") {
      params.append("sortBy", "createdAt");
      params.append("sortOrder", sort.startsWith("-") ? "desc" : "asc");
    } else if (sort === "packagePrice" || sort === "-packagePrice") {
      params.append("sortBy", "packagePrice");
      params.append("sortOrder", sort.startsWith("-") ? "desc" : "asc");
    } else if (sort === "title") {
      params.append("sortBy", "title");
      params.append("sortOrder", "asc");
    }
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours?${params.toString()}`;

  // console.log("Fetching tours from URL:", url); // Debug log

  try {
    const res = await fetch(url, {
      next: { revalidate: 8850 * 7, tags: ["tours"] },
    });

    const text = await res.text();
    
    if (!res.ok) {
      console.error("API Error Response:", text);
      throw new Error(`Failed to fetch tours: ${res.status} ${res.statusText}`);
    }

    const data = JSON.parse(text);
    
    // Revalidate cache
    revalidateTag("tours", { expire: 0 });

    return {
      tours: data.data || [],
      total: data.meta?.total || 0,
      totalPage: data.meta?.totalPage || 1,
      meta: data.meta || {},
    };
  } catch (error) {
    console.error("Error in getAllTours:", error);
    throw error;
  }
}