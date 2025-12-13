/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

export async function getGuideInfo(guideId: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/user/guide/${guideId}`;
    
    // console.log(`Fetching guide info for ID: ${guideId}`);
    // console.log(`API URL: ${url}`);
    
    const res = await fetch(url, {
      next: { 
        revalidate: 3600*30*10,
        tags: [`guide-${guideId}`] // Cache tag for revalidation
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API error (${res.status}):`, errorText);
      throw new Error(`Failed to fetch guide: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.success) {
      console.error("API returned unsuccessful:", data);
      throw new Error(data.message || "Failed to fetch guide information");
    }

    // console.log("Guide data fetched successfully:", data.data?.name);
    return {
      guide: data.data || null,
      success: true,
      message: data.message || "Guide retrieved successfully"
    };
  } catch (error: any) {
    console.error("Error in getGuideInfo:", error);
    return {
      guide: null,
      success: false,
      message: error.message || "Failed to fetch guide information"
    };
  }
}

// Revalidation function
export async function revalidateGuide(guideId: string) {
  try {
    revalidateTag(`guide-${guideId}`, {expire: 0});
    // console.log(`Revalidated guide cache for ID: ${guideId}`);
    return { success: true, message: "Guide cache revalidated" };
  } catch (error: any) {
    console.error("Error revalidating guide:", error);
    return { success: false, message: error.message || "Failed to revalidate guide" };
  }
}

export async function refreshGuideData(guideId: string) {
  try {
    
    return await getGuideInfo(guideId);
  } catch (error: any) {
    console.error("Error refreshing guide data:", error);
    return {
      guide: null,
      success: false,
      message: error.message || "Failed to refresh guide data"
    };
  }
}