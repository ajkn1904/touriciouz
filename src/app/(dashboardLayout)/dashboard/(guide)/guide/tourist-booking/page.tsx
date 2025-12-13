/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

import {
  Search,
  Calendar,
  MapPin,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Filter,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserCircle,
  Mail,
  Phone,
  AlertCircle,
  Check,
  X,
  RefreshCw,
  CreditCard,
  Users,
  TrendingUp,
} from "lucide-react";
import { BookingService, Booking, BookingStatus } from "@/src/services/booking/bookingSercvice.Action";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/src/components/ui/dialog";
import { AlertDialogHeader } from "@/src/components/ui/alert-dialog";
import GetPagination from "@/src/utils/GetPagination";

export default function GuideBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("CONFIRMED");
  const limit = 10;

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);
      const query: any = {
        page,
        limit,
      };

      if (searchTerm) {
        query.searchTerm = searchTerm;
      }

      if (statusFilter && statusFilter !== "all") {
        query.status = statusFilter;
      }

      const result = await BookingService.getGuideBookings(query);
      setBookings(result.data);
      setTotalBookings(result.meta.total);
      setTotalPages(result.meta.totalPage);
      setCurrentPage(result.meta.page);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast.error(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Award className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "UNPAID":
        return <Badge className="bg-yellow-100 text-yellow-800">Unpaid</Badge>;
      case "REFUNDED":
        return <Badge className="bg-blue-100 text-blue-800">Refunded</Badge>;
      case "FAILED":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const viewBookingDetails = (bookingId: string) => {
    router.push(`/dashboard/guide/tourist-booking/${bookingId}`);
  };

  const openStatusDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedStatus(booking.status);
    setDialogOpen(true);
  };

  const updateBookingStatus = async () => {
    if (!selectedBooking) return;

    try {
      setUpdatingStatus(selectedBooking.id);
      
      await BookingService.updateBookingStatus(selectedBooking.id, selectedStatus);
      
      toast.success(`Booking status updated to ${selectedStatus}`);
      setDialogOpen(false);
      fetchBookings(currentPage);
    } catch (error: any) {
      console.error("Error updating booking status:", error);
      toast.error(error.message || "Failed to update booking status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const canCancelBooking = (booking: Booking) => {
    // Guide can cancel paid bookings
    return booking.payment?.status === "PAID";
  };

  const canCompleteBooking = (booking: Booking) => {
    // Guide can complete confirmed bookings
    return booking.status === "CONFIRMED";
  };

  const getStatusOptions = (booking: Booking) => {
    const options: { value: BookingStatus; label: string; disabled?: boolean }[] = [
      { value: "CONFIRMED", label: "Confirmed" },
      { value: "COMPLETED", label: "Completed", disabled: !canCompleteBooking(booking) },
      { value: "CANCELLED", label: "Cancelled", disabled: !canCancelBooking(booking) },
    ];
    return options;
  };

  const calculateEarnings = () => {
    return bookings.reduce((total, booking) => {
      if (booking.status === "COMPLETED" && booking.payment?.status === "PAID") {
        return total + (booking.payment.amount * 0.9);
      }
      return total;
    }, 0);
  };

  const calculatePendingEarnings = () => {
    return bookings.reduce((total, booking) => {
      if (booking.status === "CONFIRMED" && booking.payment?.status === "PAID") {
        return total + (booking.payment.amount * 0.9);
      }
      return total;
    }, 0);
  };

  const downloadInvoice = async (paymentId: string) => {
    toast.info("Invoice download feature coming soon!");
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tour Bookings</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all bookings for your tours
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => b.status === "CONFIRMED").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => b.status === "COMPLETED").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(calculateEarnings())}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Earnings</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(calculatePendingEarnings())}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Paid Bookings</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => b.payment?.status === "PAID").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Tourists</p>
                <p className="text-2xl font-bold">
                  {new Set(bookings.map(b => b.tourist?.user?.id)).size}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>
            {totalBookings} booking{totalBookings !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter"
                  : "You don't have any bookings yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tourist</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Booking Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium flex items-center">
                            <UserCircle className="w-4 h-4 mr-2 text-gray-400" />
                            {booking.tourist?.user?.name || "N/A"}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {booking.tourist?.user?.email || "No email"}
                          </div>
                          {booking.tourist?.user?.phone && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {booking.tourist.user.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.tour.title}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {booking.tour.location}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {booking.tour.durationDays} day{booking.tour.durationDays !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(booking.date)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Booked: {formatDate(booking.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                          <div>
                            <p className="font-medium">{formatCurrency(booking.payment?.amount || 0)}</p>
                            <p className="text-xs text-gray-500">
                              Guide: {formatCurrency((booking.payment?.amount || 0) * 0.9)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getStatusBadge(booking.status)}
                          {booking.status === "COMPLETED" && (
                            <Badge variant="outline" className="text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Earnings released
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.payment && getPaymentStatusBadge(booking.payment.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewBookingDetails(booking.id)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openStatusDialog(booking)}
                            disabled={updatingStatus === booking.id}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <GetPagination
            totalItems={bookings.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={limit}
          />
        </div>
      )}
      </Card>

      {/* Status Update Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Update the status for booking #{selectedBooking?.id}
            </DialogDescription>
          </AlertDialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Current Status</p>
                {getStatusBadge(selectedBooking.status)}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Select New Status</p>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as BookingStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {getStatusOptions(selectedBooking).map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                        {option.disabled && " (Not available)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedStatus === "CANCELLED" && selectedBooking.payment?.status === "PAID" && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important Notice</p>
                      <p className="text-sm text-yellow-700">
                        Cancelling a paid booking will trigger a refund to the tourist.
                        This action requires admin approval.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedStatus === "COMPLETED" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Earnings Notification</p>
                      <p className="text-sm text-green-700">
                        Completing this booking will release your earnings (90% of total amount:{" "}
                        {formatCurrency((selectedBooking.payment?.amount || 0) * 0.9)})
                        to your balance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={updateBookingStatus}
              disabled={updatingStatus === selectedBooking?.id || selectedStatus === selectedBooking?.status}
            >
              {updatingStatus === selectedBooking?.id ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Stats and Actions */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((status) => {
                const count = bookings.filter(b => b.status === status).length;
                const percentage = totalBookings > 0 ? (count / totalBookings) * 100 : 0;
                
                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{status}</span>
                      <span>{count} bookings ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          status === "CONFIRMED" ? "bg-green-500" :
                          status === "PENDING" ? "bg-yellow-500" :
                          status === "COMPLETED" ? "bg-blue-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}