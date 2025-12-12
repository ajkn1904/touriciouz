"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Search } from "lucide-react";

interface Props {
  onFilterChange: (filters: Record<string, string>) => void;
}

export default function TourSearchFilter({ onFilterChange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "";

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const categoryOptions = [
    "HISTORY",
    "FOOD",
    "NIGHTLIFE",
    "SHOPPING",
    "ADVENTURE",
    "CULTURE",
    "ART",
    "NATURE",
  ];

  const sortOptions = [
    { label: "Newest", value: "createdAt" },
    { label: "Oldest", value: "-createdAt" },
    { label: "Price Low to High", value: "packagePrice" },
    { label: "Price High to Low", value: "-packagePrice" },
  ];

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    // Update local state for search input
    if (key === "search") setLocalSearch(value);

    // Update URL & parent
    router.push(`?${params.toString()}`);
    onFilterChange(Object.fromEntries(params.entries()));
  };

  const handleClearFilter = () => {
    setLocalSearch("");
    router.push(window.location.pathname);
    onFilterChange({});
  };

  // Sync localSearch when URL changes externally
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="border border-muted rounded-md p-3 mb-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold uppercase">Search | Filter</h1>
        <Button size="sm" variant="default" onClick={handleClearFilter}>
          Clear
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 items-center">
        {/* Search by Title */}
        <div className="relative flex-1">
          <Label className="font-semibold">Search Title</Label>
          <Search className="absolute left-2 top-8 text-muted-foreground w-4 h-4" />
          <Input
            type="search"
            value={localSearch}
            onChange={(e) => updateParams("search", e.target.value)}
            placeholder="Enter tour title"
            className="pl-8 w-full mt-1.5 bg-white dark:bg-black"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-1 items-center">
          <Label className="font-semibold">Category</Label>
          <Select
            onValueChange={(value) => updateParams("category", value)}
            value={selectedCategory}
          >
            <SelectTrigger className="w-[150px] bg-white dark:bg-black">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categoryOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex gap-1 items-center">
          <Label className="font-semibold">Sort</Label>
          <Select
            onValueChange={(value) => updateParams("sort", value)}
            value={selectedSort}
          >
            <SelectTrigger className="w-[150px] bg-white dark:bg-black">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                {sortOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
