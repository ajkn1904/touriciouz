/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAllTours } from "@/src/services/tour/getAllTours";

import BlockOrDeleteConfirmation from "@/src/components/BlockOrCancelOrDeleteConfirmation";
import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import GetPagination from "@/src/utils/GetPagination";
import { Eye, Trash2, Package, Mail, Phone, Star, Calendar, MapPin, Users, DollarSign, Clock, Trophy } from "lucide-react";
import { deleteTourAction } from "@/src/services/tour/deleteTour";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";

// Define types based on your tour data
interface Tour {
  id: string;
  title: string;
  description: string;
  category: string;
  packagePrice: number;
  durationDays: number;
  location: string;
  physicality: string;
  departure: string;
  maxGroupSize: number;
  guideId: string;
  guide?: {
    id: string;
    userId: string;
    name: string;
    email: string;
    profilePic?: string;
    phone?: string;
    bio?: string;
    languages?: string[];
    expertise: string[];
    dailyRate: number;
    rating: number;
    totalTours: number;
  } | null;
  images?: string[];
  status?: "ACTIVE" | "INACTIVE" | "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export default function ManageTours() {
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);

  const toursPerPage = 10;

  const { data: session } = useSession()

  // Load tours
  const loadTours = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllTours({
        page: currentPage,
        limit: toursPerPage,
      });

      setTours(result.tours);
      setTotalPages(result.totalPage);
      setTotalTours(result.total);
    } catch (err: any) {
      toast.error(err.message || "Failed to load tours");
      setTours([]);
      setTotalPages(1);
      setTotalTours(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Initial load and when page changes
  useEffect(() => {
    loadTours();
  }, [loadTours]);

  // Handle delete tour
  const handleDeleteTour = async (tourId: string) => {
    const toastId = toast.loading(`Deleting tour...`);
    try {
      const token = session?.user.accessToken || '';

      const result = await deleteTourAction(tourId, token);

      if (result.error) {
        toast.error(result.error, { id: toastId });
        return;
      }

      toast.success(`Tour deleted successfully!`, { id: toastId });
      loadTours(); // Refresh the list
    } catch (err: any) {
      toast.error(err.message || "Failed to delete tour", { id: toastId });
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Handle row click
  const handleRowClick = (tourId: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a')
    ) {
      return;
    }

    router.push(`/tour/${tourId}`);
  };

  // Handle view details
  const handleViewDetails = (tourId: string) => {
    router.push(`/tour/${tourId}`);
  };

  // Handle view guide profile
  const handleViewGuide = (guideId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/guide/${guideId}`);
  };

  if (loading && tours.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-5 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-5 md:py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-600 uppercase">
            Manage Tours
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Total Tours: <span className="font-semibold">{totalTours}</span>
            {totalPages > 1 && (
              <span className="ml-4">
                Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 uppercase">
              <TableRow className="border-b dark:border-gray-700">
                <TableHead className="font-bold text-gray-900 dark:text-white py-4 w-[300px]">Name</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white py-4 w-[250px]">Guide</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white py-4 text-center w-[200px]">Amount</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white py-4 w-[200px]">Status</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white py-4 w-[200px]">Dates</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white py-4 text-center w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Package className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No tours found</p>
                      <p className="text-sm text-gray-400 mt-2">Create your first tour to get started</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                tours.map((tour) => (
                  <TableRow
                    key={tour.id}
                    onClick={(e) => handleRowClick(tour.id, e)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b dark:border-gray-700 transition-colors duration-150"
                  >
                    {/* Tour Details */}
                    <TableCell className="py-4 w-[300px]">
                      <div className="flex items-start space-x-3">
                        {/* {tour.images && tour.images.length > 0 ? (
                          <div className="w-16 h-16 flex-shrink-0">
                            <Image
                              width={64}
                              height={64}
                              src={tour.images[0]}
                              alt={tour.title}
                              className="w-full h-full object-cover rounded-lg shadow-sm"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-green-100 to-teal-100 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-green-400 dark:text-green-300" />
                          </div>
                        )} */}
                        <div className="min-w-0 flex-1 max-w-[200px]">

                          <div className="flex items-center gap-2 mb-1 w-[150px] mx-2">
                            <h3 className="font-bold text-gray-900 dark:text-white truncate"
                              title={tour.title}>
                              {tour.title}
                            </h3>
                          </div>
                            {/* <Badge variant="outline" className="flex-shrink-0 text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200">
                              {tour.category}
                            </Badge> */}


                          {/* <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2 w-[150px]"
                            title={tour.description}>
                            {tour.description}
                          </p> */}

                          {/* <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 truncate">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{tour.location}</span>
                            <span className="mx-2 flex-shrink-0">•</span>
                            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{tour.durationDays} days</span>
                          </div> */}
                        </div>
                      </div>
                    </TableCell>

                    {/* Guide Information */}
                    <TableCell className="py-4 w-[250px]">
                      {tour.guide ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            {/* {tour.guide.profilePic ? (
                              <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-green-200">
                                <Image
                                  width={40}
                                  height={40}
                                  src={tour.guide.profilePic}
                                  alt={tour.guide.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200">
                                <span className="font-bold text-blue-600 dark:text-blue-300">
                                  {tour.guide.name?.charAt(0) || "G"}
                                </span>
                              </div>
                            )} */}
                            <div className="min-w-0 flex-1">
                              {/* <h4 className="font-semibold text-gray-900 dark:text-white truncate"
                                title={tour.guide.name}>
                                {tour.guide.name}
                              </h4> */}
                              <span className="truncate" title={tour.guide.email}>
                                {tour.guide.email}
                              </span>
                              {/* <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 flex-shrink-0 text-teal-500" />
                                <span className="text-xs font-medium">{tour.guide.rating?.toFixed(1) || "0.0"}</span>
                                <span className="text-xs text-gray-500 flex-shrink-0">•</span>
                                <Trophy className="h-3 w-3 flex-shrink-0 text-purple-500" />
                                <span className="text-xs text-gray-500 truncate">{tour.guide.totalTours || 0} tours</span>
                              </div> */}
                            </div>
                          </div>

                          {/* <div className="space-y-1 border rounded-md w-24">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <Mail className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400" />
                              <span className="truncate" title={tour.guide.email}>
                                {tour.guide.email}
                              </span>
                            </div>
                            {tour.guide.phone && (
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Phone className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400" />
                                <span className="truncate" title={tour.guide.phone}>
                                  {tour.guide.phone}
                                </span>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleViewGuide(tour.guide?.id || "", e)}
                              className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 w-24"
                            >
                              View Profile
                            </Button>
                          </div> */}
                        </div>
                      ) : (
                        <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <Users className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">No Guide Assigned</p>
                        </div>
                      )}
                    </TableCell>

                    {/* Tour Specifications */}
                    <TableCell className="py-4 text-center w-[200px]">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <span className=" text-gray-900 dark:text-white truncate">
                              {formatPrice(tour.packagePrice)}
                            </span>
                          </div>
                          {/* <span className="text-xs text-gray-500">Total Package</span> */}
                        </div>

                        {/* <div className="grid grid-cols-2 gap-2 w-full">
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <Users className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                            <span className="text-sm font-medium">{tour.maxGroupSize}</span>
                            <p className="text-xs text-gray-500 truncate">Max Group</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <Calendar className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                            <span className="text-sm font-medium">{tour.durationDays}</span>
                            <p className="text-xs text-gray-500">Days</p>
                          </div>
                        </div> */}

                        {/* <Badge
                          variant="secondary"
                          className={`text-xs bg-green-500/20 dark:text-green-300"`}
                        >
                          {tour.physicality} Level
                        </Badge> */}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div>
                        <div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium truncate ${tour.status === "ACTIVE" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                            tour.status === "INACTIVE" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                              tour.status === "PENDING" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                                tour.status === "COMPLETED" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                  "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                            }`}>
                            <div className="w-2 h-2 rounded-full mr-2 bg-current flex-shrink-0"></div>
                            <span className="truncate text-sm">{tour.status || "ACTIVE"}</span>
                          </div>
                        </div>

                      </div>
                    </TableCell>
                    {/* Dates */}
                    <TableCell className="">
                      <div className="space-y-3">
              
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <span className="truncate">Created At: {formatDate(tour.createdAt)}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                            <span className="truncate">Updated At: {formatDate(tour.updatedAt)}</span>
                          </div>
                        </div>

                        {/* <div className="text-xs">
                          <p className="text-gray-500 dark:text-gray-400 truncate">Departure:</p>
                          <p className="font-medium truncate" title={tour.departure}>
                            {tour.departure}
                          </p>
                        </div> */}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 w-[150px]">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(tour.id)}
                          className="flex-1 bg-blue-50 text-green-700 hover:text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:text-green-200 border-green-200 dark:border-green-800 py-1"
                          title="View Tour Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <BlockOrDeleteConfirmation
                          onConfirm={() => handleDeleteTour(tour.id)}
                          actionType="delete"
                          customTitle={`Delete Tour: ${tour.title}`}
                          customDescription="Are you sure you want to delete this tour? This action cannot be undone."
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-red-50 text-red-700 hover:text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:text-red-200 border-red-200 dark:border-red-800 py-1"
                            title="Delete Tour"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </BlockOrDeleteConfirmation>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <GetPagination
            totalItems={totalTours}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={toursPerPage}
          />
        </div>
      )}
    </div>
  );
}