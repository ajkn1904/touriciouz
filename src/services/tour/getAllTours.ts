"use server";
import { revalidateTag } from "next/cache";

interface GetAllToursParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
}

export async function getAllTours({
  page = 1,
  limit = 10,
  search,
  category,
  sort,
}: GetAllToursParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);

  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 8850 * 7, tags: ["tours"] },
  });

  const text = await res.text();
  // console.log("Fetch tours status:", res.status);
  // console.log("Fetch tours body:", text);

  if (!res.ok) throw new Error(`Failed to fetch tours: ${text}`);
  if (res.ok) revalidateTag("tours", { expire: 0 });

  const data = JSON.parse(text);

  return {
    tours: data.data || [],
    total: data.meta?.total || 0,
    totalPage: data.meta?.totalPage || 1,
  };
}
