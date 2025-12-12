/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import Link from "next/link";
import GetPagination from "@/src/utils/GetPagination";
import { getGuideTours } from "@/src/services/tour/getGuideTour";


interface Tour {
  id: string;
  title: string;
  category: string;
  packagePrice: number;
  durationDays: number;
  status?: string;
}

export default function GuideTours() {
  const { data: session, status } = useSession();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10;
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTours = async (page: number) => {
    const token=session?.user.accessToken;

    if (!token) return;

    setLoading(true);
    try {
      const data = await getGuideTours(token, currentPage, toursPerPage);


      if (!data || !data.data) throw new Error("Failed to fetch tours");

      setTours(data.data);
      setTotal(data.meta.total);
      setTotalPages(data.meta.totalPage || 1);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchTours(currentPage);
    }
  }, [status, currentPage]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    if (!session?.user?.accessToken) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tours/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to delete tour");

      toast.success("Tour deleted successfully");
      fetchTours(currentPage); // refresh current page
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete tour");
    }
  };

  if (status === "loading") return <p className="text-center p-6">Checking authentication...</p>;
  if (status === "unauthenticated") return <p className="text-center p-6 text-red-500">You are not authenticated</p>;
  if (loading) return <p className="text-center p-6">Loading tours...</p>;
  if (!tours.length) return <p className="text-center p-6">No tours found</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-5">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold text-green-600">MY TOURS: {total}</h1>
        <Button className="my-8">
          <Link href="/guide/tour/create">CREATE TOUR</Link>
        </Button>
      </div>

      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader className="bg-green-200">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour, index) => (
              <TableRow key={tour.id}>
                <TableCell>{(currentPage - 1) * toursPerPage + index + 1}</TableCell>
                <TableCell>{tour.title}</TableCell>
                <TableCell>{tour.category}</TableCell>
                <TableCell>${tour.packagePrice}</TableCell>
                <TableCell>{tour.durationDays} Days</TableCell>
                <TableCell>{tour.status || "Active"}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Link href={`/guide/tour/edit/${tour.id}`}>
                    <Button size="sm" variant="outline" className="text-blue-500 hover:bg-blue-500 hover:text-white">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="text-red-600 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(tour.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <GetPagination
            totalItems={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={toursPerPage}
          />
        </div>
      )}
    </div>
  );
}
