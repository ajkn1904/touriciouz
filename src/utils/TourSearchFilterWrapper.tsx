/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TourSearchFilterClient({ onFilterChange }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`);
    onFilterChange(Object.fromEntries(params.entries()));
  };

  return (
    <input
      value={search}
      onChange={(e) => update("search", e.target.value)}
      placeholder="Search tours"
      className="border p-2 w-full"
    />
  );
}
