/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";

export async function createTourAction(token: string, formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const raw = await res.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      throw new Error(raw);
    }

    if (!res.ok) {
      return { error: result.message || "API error" };
    }

    // ✅ Revalidate the cache for tours
    revalidateTag("tours", { expire: 0 });

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to create tour" };
  }
}
