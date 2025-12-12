"use server";

import { revalidateTag } from "next/cache";

export async function getGuideTours(accessToken: string, page = 1, limit = 10) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours/my-tours?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 8850 * 7, tags: ["tours"] },
    }
  );

  const text = await res.text();
  console.log("Fetch guide tours status:", res.status);
  console.log("Fetch guide tours body:", text);

  if (!res.ok) throw new Error(`Failed to fetch tours: ${text}`);

  const data = JSON.parse(text);
  if (!data.success) throw new Error(data.message || "Failed to fetch tours");

  if (res.ok) revalidateTag("tours", { expire: 0 });

  return data; // return full response including meta
}
