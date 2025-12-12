/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CheckCircle, XCircle, Clock, AlertCircle, DollarSign, User, MapPin, Eye, RefreshCw, Users } from "lucide-react";
import { Booking, BookingService, BookingStatus, PaginatedBookings } from "@/src/services/booking/bookingSercvice.Action";
import { toast } from "sonner";
import GetPagination from "@/src/utils/GetPagination";

export default function AdminBookingManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const limit = 10;

  const statusOptions: { value: BookingStatus | "ALL"; label: string; color: string; icon: any }[] = [
    { value: "ALL", label: "All", color: "bg-gray-100 text-gray-800", icon: null },
    { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    { value: "CONFIRMED", label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
    { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
    { value: "COMPLETED", label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  ];

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const query: Record<string, any> = {
        page: currentPage,
        limit,
      };

      if (selectedStatus !== "ALL") {
        query.status = selectedStatus;
      }

      const result: PaginatedBookings = await BookingService.getAllBookings(query);
      
      setBookings(result.data);
      setTotalPages(result.meta.totalPage);
      setTotalBookings(result.meta.total);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, selectedStatus]);

  const handleStatusUpdate = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      setUpdatingStatus(true);
      await BookingService.updateBookingStatus(bookingId, newStatus);
      toast.success(`Booking status updated to ${newStatus.toLowerCase()}`);
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to update booking status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "CONFIRMED":
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800";
      case "REFUNDED":
        return "bg-blue-100 text-blue-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateTotalPrice = (booking: Booking) => {
    const { packagePrice, guideFee, durationDays } = booking.tour;
    return packagePrice + (guideFee * durationDays);
  };

  if (loading && bookings.length === 0) {
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
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 dark:text-orange-400">
            Booking Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Total Bookings: <span className="font-semibold">{totalBookings}</span>
            {totalPages > 1 && (
              <span className="ml-4">
                Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => {
                setSelectedStatus(status.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                selectedStatus === status.value
                  ? status.color
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {status.icon && <status.icon className="w-4 h-4" />}
              {status.label}
            </button>
          ))}
          
          <button
            onClick={() => {
              setSelectedStatus("ALL");
              setCurrentPage(1);
              fetchBookings();
            }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        {error ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchBookings}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">No bookings found</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tour & Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tourist
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Guide
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]" title={booking.tour.title}>
                              {booking.tour.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {format(new Date(booking.date), "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[180px]">
                              {booking.tour.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                      
                          {/* Tourist Info */}
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mt-0.5">
                              <User className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-2 flex-1 min-w-0">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Tourist
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white truncate" title={booking.tourist.user.name}>
                                {booking.tourist.user.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={booking.tourist.user.email}>
                                {booking.tourist.user.email}
                              </div>
                            </div>
                          </div>
                         </td>
                         <td className="px-4 py-4"> 
                          {/* Guide Info */}
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                              <Users className="w-3 h-3 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-2 flex-1 min-w-0">
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Guide
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white truncate" title={booking.guide.user.name}>
                                {booking.guide.user.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={booking.guide.user.email}>
                                {booking.guide.user.email}
                              </div>
                            </div>
                          </div>
                        
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          ${calculateTotalPrice(booking).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {booking.tour.durationDays} days
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          ${booking.tour.packagePrice} + ${booking.tour.guideFee}/day
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusOptions.find(s => s.value === booking.status)?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{booking.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.payment?.status || 'UNPAID')} dark:bg-opacity-30 dark:text-opacity-90`}>
                          <DollarSign className="w-3 h-3 mr-1" />
                          {booking.payment?.status || "UNPAID"}
                        </span>
                        {booking.payment?.transactionId && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate max-w-[120px]" title={booking.payment.transactionId}>
                            ID: {booking.payment.transactionId.substring(0, 8)}...
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingStatus)}
                            disabled={updatingStatus}
                            className="text-sm border dark:border-gray-600 rounded p-1 bg-white dark:bg-gray-700 dark:text-white min-w-[100px]"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirm</option>
                            <option value="CANCELLED">Cancel</option>
                            <option value="COMPLETED">Complete</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 p-4 border-t dark:border-gray-700">
                <GetPagination
                  totalItems={totalBookings}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={limit}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}