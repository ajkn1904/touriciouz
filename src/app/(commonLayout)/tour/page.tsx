/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import GetPagination from "@/src/utils/GetPagination";
import { useRouter } from "next/navigation";
import { getAllTours } from "@/src/services/tour/getAllTours";
import TourSearchFilter from "@/src/utils/tourSearchFilter";

interface Tour {
  id: string;
  title: string;
  description: string;
  itinerary: string | null;
  category: string;
  packagePrice: number;
  durationDays: number;
  images: string[];
  createdAt: string;
}

export default function ToursPage() {
  const router = useRouter();

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const toursPerPage = 10;

  const fetchTours = async () => {
    setLoading(true);
    try {
      const { tours: allTours } = await getAllTours({
        page: 1,
        limit: 1000, 
      });

      let filteredTours = allTours;

      if (filters.search) {
        filteredTours = filteredTours.filter((tour: Tour) =>
          tour.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.category) {
        filteredTours = filteredTours.filter(
          (tour: Tour) => tour.category === filters.category
        );
      }

      if (filters.sort) {
        if (filters.sort === "createdAt") {
          filteredTours.sort(
            (a: Tour, b: Tour) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (filters.sort === "-createdAt") {
          filteredTours.sort(
            (a: Tour, b: Tour) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        } else if (filters.sort === "packagePrice") {
          filteredTours.sort((a: Tour, b: Tour) => a.packagePrice - b.packagePrice);
        } else if (filters.sort === "-packagePrice") {
          filteredTours.sort((a: Tour, b: Tour) => b.packagePrice - a.packagePrice);
        }
      }

      // Pagination
      const start = (currentPage - 1) * toursPerPage;
      const paginatedTours = filteredTours.slice(start, start + toursPerPage);

      setTours(paginatedTours);
      setTotalTours(filteredTours.length);
      setTotalPages(Math.ceil(filteredTours.length / toursPerPage));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch tours");
      toast.error(err.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [filters, currentPage]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <TourSearchFilter onFilterChange={(newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); 
      }} />

      {loading ? (
        <p className="text-center p-6">Loading tours...</p>
      ) : error ? (
        <p className="text-red-500 text-center p-6">{error}</p>
      ) : tours.length === 0 ? (
        <p className="text-center p-6">No tours found.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => router.push(`/tour/${tour.id}`)}
              >
                <Image
                  height={160}
                  width={200}
                  src={tour.images?.[0] || "/placeholder.png"}
                  alt={tour.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h2 className="font-bold text-lg">{tour.title}</h2>
                <p className="text-sm text-gray-600">{tour.category}</p>
                <p className="mt-2 text-gray-700">{tour.description}</p>
                <p className="mt-2 font-semibold">Price: ${tour.packagePrice}</p>
                <p>Duration: {tour.durationDays} day(s)</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <GetPagination
                totalItems={totalTours}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={toursPerPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
