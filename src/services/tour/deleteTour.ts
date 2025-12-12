"use server"
import { revalidateTag } from "next/cache";

export async function deleteTourAction(id: string, token: string) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"
      }/tours/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const raw = await res.text();
    console.log("RAW RESPONSE FROM API:", raw);

    let result;
    try {
      result = JSON.parse(raw);
    } catch (e) {
      console.log("JSON parse failed");
      throw new Error(raw);
    }

    if (!res.ok) {
      console.log("Backend returned error:", result);
      return { error: result.message || "API error" };
    }
    if (res.ok && result.success) {
      // Invalidate caches after delete
      revalidateTag("tours", { expire: 0 });
      revalidateTag(`tour-${id}`, { expire: 0 });
    }
    return { success: true, data: result.data };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete tour" };
  }
}
