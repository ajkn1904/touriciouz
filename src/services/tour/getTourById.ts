"use server";

import { revalidateTag } from "next/cache";

export async function getTourById(id: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"
    }/tours/${id}`,
    {
      next: {
        revalidate: 7 * 86400,
        tags: [`tour-${id}`],
      },
    }
  );

  const data = await res.json();
  if (data) {
    revalidateTag("tours", { expire: 0 });
  }
  return data?.data || null;
}
