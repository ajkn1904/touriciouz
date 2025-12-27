/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
    Calendar,
    MapPin,
    User,
    CheckCircle,
    XCircle,
    Clock,
    Award,
    Mail,
    Phone,
    Globe,
    Users,
    Clock4,
    ArrowLeft,
    Download,
    Share2,
    MessageCircle,
    Languages,
    AlertTriangle,
    Check,
    DollarSign,
    Loader2,
} from "lucide-react";
import { BookingService, Booking, BookingStatus } from "@/src/services/booking/bookingSercvice.Action";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import Image from "next/image";

interface TouristUserInfo {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profilePic?: string;
    languages?: string[];
}


export default function GuideBookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [booking, setBooking] = useState<any | null>(null);
    const [touristUser, setTouristUser] = useState<TouristUserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingTourist, setLoadingTourist] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("CONFIRMED");

    useEffect(() => {
        if (id) {
            fetchBookingDetails();
        }
    }, [id]);

    useEffect(() => {
        if (booking?.tourist?.userId) {
            fetchTouristUserInfo(booking.tourist.userId);
        }
    }, [booking?.tourist?.userId]);

    const fetchBookingDetails = async () => {
        try {
            setLoading(true);
            const data = await BookingService.getBookingById(id as string);
            //console.log("Booking data:", data);
            setBooking(data);
            setSelectedStatus(data.status);
        } catch (error: any) {
            console.error("Error fetching booking details:", error);
            toast.error(error.message || "Failed to load booking details");
            router.push("/dashboard/guide/bookings");
        } finally {
            setLoading(false);
        }
    };

    const fetchTouristUserInfo = async (userId: string) => {
        try {
            setLoadingTourist(true);
            //console.log("Fetching tourist user info for ID:", userId);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/user/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`,
                        'Content-Type': 'application/json',
                    },
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch tourist user: ${response.status}`);
            }

            const data = await response.json();
            //console.log("Tourist user data:", data);

            if (data.success && data.data) {
                setTouristUser(data.data);
            }
        } catch (error: any) {
            console.error("Error fetching tourist user info:", error);
            // Don't show error toast - it's not critical
        } finally {
            setLoadingTourist(false);
        }
    };

    const getStatusBadge = (status: string) => {
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
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const canCancelBooking = () => {
        return booking?.payment?.status === "PAID";
    };

    const canCompleteBooking = () => {
        return booking?.status === "CONFIRMED";
    };

    const getStatusOptions = () => {
        const options: { value: BookingStatus; label: string; disabled?: boolean }[] = [
            { value: "CONFIRMED", label: "Confirmed" },
            { value: "COMPLETED", label: "Completed", disabled: !canCompleteBooking() },
            { value: "CANCELLED", label: "Cancelled", disabled: !canCancelBooking() },
        ];
        return options;
    };

    const updateBookingStatus = async () => {
        if (!booking) return;

        try {
            setUpdatingStatus(true);

            await BookingService.updateBookingStatus(booking.id, selectedStatus);

            toast.success(`Booking status updated to ${selectedStatus}`);
            fetchBookingDetails(); // Refresh data
        } catch (error: any) {
            console.error("Error updating booking status:", error);
            toast.error(error.message || "Failed to update booking status");
        } finally {
            setUpdatingStatus(false);
        }
    };

    const downloadInvoice = () => {
        toast.info("Invoice download feature coming soon!");
    };

    const contactTourist = () => {
        if (touristUser?.phone) {
            window.open(`tel:${touristUser.phone}`);
        } else if (touristUser?.email) {
            window.open(`mailto:${touristUser.email}`);
        } else {
            toast.error("No contact information available for the tourist");
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading booking details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
                    <p className="text-gray-600 mb-6">The booking you&apos;re looking for doesn&apos;t exist.</p>
                    <Button onClick={() => router.push("/dashboard/guide/tourist-booking")}>
                        Back to Bookings
                    </Button>
                </div>
            </div>
        );
    }

    const guideEarnings = booking.payment?.amount ? booking.payment.amount * 0.9 : 0;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-green-600 uppercase">Booking Details</h1>
                            <p className="text-gray-600">Booking ID: {booking.id}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                                                <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push("/dashboard/guide/tourist-booking")}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Bookings
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Booking Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tourist Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Tourist Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loadingTourist ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mr-3" />
                                    <p className="text-gray-600">Loading tourist information...</p>
                                </div>
                            ) : touristUser ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      {touristUser?.profilePic ? (
                        <div className="w-full h-full relative">
                          <Image
                            src={touristUser?.profilePic}
                            alt={touristUser.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-400">
                            {touristUser.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{touristUser.name || "N/A"}</h3>
                                            <p className="text-gray-600">Tourist</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {touristUser.email && (
                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 text-gray-400 mr-3" />
                                                <div>            
                                                    <p className="font-medium hover:text-blue-500 hover:underline">{touristUser.email}</p>
                                                </div>
                                            </div>
                                        )}

                                        {touristUser.phone && (
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="font-medium hover:underline hover:text-blue-500">{touristUser.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        {touristUser.languages && touristUser.languages.length > 0 && (
                                            <div className="col-span-2">
                                                <p className="text-sm text-gray-500 mb-2 flex items-center">
                                                    <Languages className="w-4 h-4 mr-2" />
                                                    Languages
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {touristUser.languages.map((lang, index) => (
                                                        <Badge key={index} variant="secondary">
                                                            {lang}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {(touristUser.email || touristUser.phone) && (
                                        <div className="pt-4 border-t">
                                            <Button onClick={contactTourist} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md border border-green-500 shadow-lg transition-all duration-300 hover:border-2 w-full">
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                Contact Tourist
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">Tourist information not available</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Tourist ID: {booking.tourist?.id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        User ID: {booking.tourist?.userId}
                                    </p>
                                    <Button
                                        onClick={() => booking.tourist?.userId && fetchTouristUserInfo(booking.tourist.userId)}
                                        variant="outline"
                                        size="sm"
                                        className="mt-4"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tour Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Tour Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{booking.tour?.title || "No title"}</h3>
                                    <div className="flex items-center text-gray-600 mt-1">
                                        <Globe className="w-4 h-4 mr-2" />
                                        <span>{booking.tour?.category || "No category"}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium">{booking.tour?.location || "Not specified"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-medium">{booking.tour?.durationDays || 0} days</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Group Size</p>
                                            <p className="font-medium">{booking.tour?.maxGroupSize || "Not specified"} people</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Clock4 className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Departure Time</p>
                                            <p className="font-medium">{booking.tour?.departureTime || "Not specified"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Schedule */}
                                <div className="pt-4 border-t">
                                    <h4 className="font-semibold mb-2">Booking Schedule</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Booking Date</p>
                                            <p className="font-medium">{formatDate(booking.date)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Booked On</p>
                                            <p className="font-medium">{formatDateTime(booking.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Last Updated</p>
                                            <p className="font-medium">{formatDateTime(booking.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Actions & Payment */}
                <div className="space-y-6">
                    {/* Status Update Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Update Booking Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-2">Current Status</p>
                                {getStatusBadge(booking.status)}
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-2">New Status</p>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={(value) => setSelectedStatus(value as BookingStatus)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getStatusOptions().map((option) => (
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

                            {selectedStatus === "CANCELLED" && booking.payment?.status === "PAID" && (
                                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-yellow-800">Important Notice</p>
                                            <p className="text-sm text-yellow-700">
                                                Cancelling a paid booking will trigger a refund to the tourist.
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
                                                Completing this booking will release your earnings (90% of total amount).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={updateBookingStatus}
                                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md border border-green-500 shadow-lg transition-all duration-300 hover:border-2 w-full"
                                disabled={updatingStatus || selectedStatus === booking.status}
                            >
                                {updatingStatus ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Updating...
                                    </>
                                ) : (
                                    "Update Status"
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Payment Summary Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Payment Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Package Price</span>
                                    <span className="font-medium">
                                        {formatCurrency(booking.tour?.packagePrice || 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Guide Fee</span>
                                    <span className="font-medium">
                                        {formatCurrency(booking.tour?.guideFee || 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t pt-3">
                                    <span className="font-semibold">Total Amount</span>
                                    <span className="font-bold text-lg">
                                        {formatCurrency(booking.payment?.amount || 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t pt-3">
                                    <span className="font-semibold">Your Earnings (90%)</span>
                                    <span className="font-bold text-lg text-green-600">
                                        {formatCurrency(guideEarnings)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                                    {booking.payment ? getPaymentStatusBadge(booking.payment.status) : "No payment data"}
                                </div>

                                {booking.payment?.transactionId && (
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded block truncate">
                                            {booking.payment.transactionId}
                                        </code>
                                    </div>
                                )}
                            </div>

                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}