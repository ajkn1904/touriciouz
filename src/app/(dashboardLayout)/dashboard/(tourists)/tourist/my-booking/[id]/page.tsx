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
  DollarSign,
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
  Map,
  Tag,
  Image as ImageIcon,
  Star,
  Trophy,
  Languages,
  Briefcase,
} from "lucide-react";
import { BookingService, Booking } from "@/src/services/booking/bookingSercvice.Action";
import Image from "next/image";

interface GuideInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePic?: string;
  bio?: string;
  languages?: string[];
  role: string;
  status: string;
  updatedAt: string;
  guide: {
    id: string;
    dailyRate: number;
    expertise?: string[];
    rating: number;
    totalTours: number;
    balance: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface BookingData {
  id: string;
  touristId: string;
  guideId: string;
  tourId: string;
  date: string;
  status: Booking["status"];
  createdAt: string;
  updatedAt: string;
  tour: {
    id: string;
    title: string;
    description: string;
    category: string;
    packagePrice: number;
    guideFee: number;
    durationDays: number;
    physicality: string;
    location: string;
    meetingPoint: string;
    maxGroupSize: number;
    ageLimit: string;
    departure: string;
    departureTime: string;
    rating: number;
    isActive: boolean;
    images?: string[];
    itinerary?: string;
    includedLocations?: string[];
    notIncludedLocations?: string[];
    priceIncludes?: string[];
    priceExcludes?: string[];
  };
  payment: {
    id: string;
    amount: number;
    status: string;
    transactionId: string;
    paymentGatewayData?: any;
    invoiceUrl?: string;
  };
  tourist: {
    id: string;
    userId: string;
  };
}

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [guide, setGuide] = useState<GuideInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [guideLoading, setGuideLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
  }, [id]);

  useEffect(() => {
    if (booking?.guideId) {
      fetchGuideInfo();
    }
  }, [booking?.guideId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getBookingById(id as string);
      console.log("Booking data received:", data);
      setBooking(data as any);
    } catch (error: any) {
      console.error("Error fetching booking details:", error);
      toast.error(error.message || "Failed to load booking details");
      router.push("/dashboard/tourist/my-bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchGuideInfo = async () => {
    if (!booking?.guideId) return;

    try {
      setGuideLoading(true);
      console.log("Fetching guide info for ID:", booking.guideId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/user/guide/${booking.guideId}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch guide: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full guide API response:", data);

      if (data.success && data.data) {
        console.log("Guide data fetched:", data.data);
        setGuide(data.data);
      } else {
        console.warn("No guide data found or API returned unsuccessful");
      }
    } catch (error: any) {
      console.error("Error fetching guide info:", error);
      // Don't show error toast for guide info - it's not critical
    } finally {
      setGuideLoading(false);
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

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const parseItinerary = (itineraryString?: string) => {
    if (!itineraryString) return [];
    try {
      return JSON.parse(itineraryString);
    } catch (error) {
      // If not valid JSON, try to split by newlines
      return itineraryString.split("\n").filter(item => item.trim());
    }
  };

  const downloadInvoice = () => {
    if (booking?.payment?.invoiceUrl) {
      window.open(booking.payment.invoiceUrl, "_blank");
    } else {
      toast.info("Invoice download feature coming soon!");
    }
  };

  const contactGuide = () => {
    if (guide?.phone) {
      window.open(`tel:${guide.phone}`);
    } else if (guide?.email) {
      window.open(`mailto:${guide.email}`);
    } else {
      toast.error("No contact information available for the guide");
    }
  };

  const viewGuideProfile = () => {
    if (guide?.id) {
      router.push(`/guide/${id}`);
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
          <Button onClick={() => router.push("/dashboard/tourist/my-booking")}>
            Back to My Bookings
          </Button>
        </div>
      </div>
    );
  }

  const itineraryItems = parseItinerary(booking.tour?.itinerary);
  const isGuideAvailable = guide?.status === "ACTIVE" && guide?.guide?.id;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-600">Booking ID: {booking.id}</p>
            </div>

          </div>
          <div className="flex gap-2">
            {getStatusBadge(booking.status)}
            <Button
              variant="default"
              onClick={() => router.push("/dashboard/tourist/my-booking")}
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
          {/* Tour Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Information</CardTitle>
              <CardDescription>Details about the tour you booked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{booking.tour?.title || "No title"}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{booking.tour?.category || "No category"}</span>
                    <Badge variant="outline" className="ml-2">
                      {booking.tour?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                {booking.tour?.description && (
                  <div className="mt-4">
                    <p className="text-gray-700">{booking.tour.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{booking.tour?.location || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Map className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Meeting Point</p>
                      <p className="font-medium">{booking.tour?.meetingPoint || "Not specified"}</p>
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
                    <Tag className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Physicality</p>
                      <p className="font-medium">{booking.tour?.physicality || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock4 className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <div>
                        <p className="font-medium">{booking.tour?.departure || "Not specified"}</p>
                        <p className="text-xs text-gray-500">{booking.tour?.departureTime || "Time not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => booking.tour?.id && router.push(`/tour/${booking.tour.id}`)}
                  className="w-full"
                  variant="default"
                  disabled={!booking.tour?.id}
                >
                  View Tour Details
                </Button>


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

          {/* Guide Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Guide Information</CardTitle>
                <CardDescription>Your tour guide details</CardDescription>
              </div>
              {guide?.id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={viewGuideProfile}
                >
                  View Full Profile
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {guideLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="ml-3 text-gray-600">Loading guide information...</p>
                </div>
              ) : guide ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    {guide.profilePic ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mr-4">
                        <Image
                          src={guide.profilePic}
                          alt={guide.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-gray-200 mr-4">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{guide.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-500 mr-1" />
                          <span className="font-medium">{guide.guide?.rating?.toFixed(1) || "0.0"}</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 text-purple-500 mr-1" />
                          <span>{guide.guide?.totalTours || 0} tours</span>
                        </div>
                        <Badge variant={isGuideAvailable ? "default" : "secondary"}>
                          {isGuideAvailable ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guide.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{guide.email}</p>
                        </div>
                      </div>
                    )}

                    {guide.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{guide.phone}</p>
                        </div>
                      </div>
                    )}

                    {guide.guide?.dailyRate && (
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Daily Rate</p>
                          <p className="font-medium">{formatCurrency(guide.guide.dailyRate)}/day</p>
                        </div>
                      </div>
                    )}
                  </div>


                  {(guide.email || guide.phone) && (
                    <div className="pt-4 border-t">
                      <Button onClick={contactGuide} className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact Guide
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Guide information not available</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Guide ID: {booking.guideId}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment & Actions */}
        <div className="space-y-6">
          {/* Payment Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
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
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                  {booking.payment?.status === "PAID" ? (
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  ) : (
                    <Badge variant="outline">Unpaid</Badge>
                  )}
                </div>

                {booking.payment?.transactionId && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded block truncate">
                      {booking.payment.transactionId}
                    </code>
                  </div>
                )}

                {booking.payment?.paymentGatewayData && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Gateway</p>
                    <Badge variant="outline">
                      {booking.payment.paymentGatewayData.status || "Unknown"}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  onClick={downloadInvoice}
                  className="w-full"
                  variant="outline"
                  disabled={!booking.payment?.invoiceUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {booking.payment?.invoiceUrl ? "Download Invoice" : "Invoice Unavailable"}
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Booking
                </Button>
              </div>
            </CardContent>
          </Card>
          <Button
            variant="secondary"
            onClick={() => router.push("/dashboard/tourist/my-booking")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}