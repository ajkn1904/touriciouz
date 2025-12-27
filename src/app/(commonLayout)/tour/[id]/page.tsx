/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  BiDumbbell,
  BiTimeFive,
} from "react-icons/bi";
import {
  TiGlobeOutline,
  TiTick,
} from "react-icons/ti";
import {
  RiUserStarLine,
  RiStarFill,
} from "react-icons/ri";
import { FcOvertime } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
} from "react-icons/md";
import {
  FaUser,
  FaStar,
  FaTrophy,
  FaLanguage,
} from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { BookingService } from "@/src/services/booking/bookingSercvice.Action";

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { id } = params || {};

  const [tour, setTour] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [hasActiveBooking, setHasActiveBooking] = useState<boolean>(false);
  const [itineraryData, setItineraryData] = useState<string[]>([]);

  // Fetch tour data
  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tour");
        }

        const data = await response.json();
        setTour(data.data || data);

        // Parse itinerary data
        if (data.data?.itinerary || data?.itinerary) {
          const itinerary = data.data?.itinerary || data?.itinerary;
          try {
            // Check if it's a JSON string
            if (itinerary.startsWith('[')) {
              const parsed = JSON.parse(itinerary);
              setItineraryData(Array.isArray(parsed) ? parsed : [parsed]);
            } else if (itinerary.includes(',')) {
              // Handle comma-separated string
              const items = itinerary.split(',').map((item: string) => item.trim());
              setItineraryData(items);
            } else {
              // Single string
              setItineraryData([itinerary]);
            }
          } catch (e) {
            // If parsing fails, use as is
            console.log("Itinerary parsing error:", e);
            setItineraryData([itinerary]);
          }
        }
      } catch (error: any) {
        console.error("Error fetching tour:", error);
        toast.error(error.message || "Failed to load tour details");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  console.log("Tour data:", tour);
  console.log("Itinerary data:", itineraryData);

  // Function to check existing bookings
  const checkExistingBooking = async () => {
    if (!session?.user || !tour?.id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/booking/my-bookings`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const bookings = result.data || result;

        // Find ALL bookings for this tour (including active ones)
        const allBookingsForThisTour = bookings.filter((booking: any) =>
          booking.tour?.id === tour.id
        );

        // Check for active bookings (not cancelled or completed)
        const activeBooking = allBookingsForThisTour.find((booking: any) =>
          !['CANCELLED', 'COMPLETED'].includes(booking.status)
        );

        // Check for pending/failed/cancelled bookings
        const existingBooking = allBookingsForThisTour.find((booking: any) =>
          booking.tour?.id === tour.id &&
          (booking.status === 'PENDING' || booking.status === 'FAILED' || booking.status === 'CANCELLED')
        );

        if (activeBooking) {
          setHasActiveBooking(true);
          setBookingId(activeBooking.id);
          setBookingStatus(activeBooking.status);

          // Store in localStorage
          localStorage.setItem('pendingBooking', JSON.stringify({
            bookingId: activeBooking.id,
            tourId: tour.id,
            status: activeBooking.status,
            tourTitle: tour.title
          }));
        } else if (existingBooking) {
          setHasActiveBooking(false);
          setBookingId(existingBooking.id);
          setBookingStatus(existingBooking.status);

          // Store in localStorage
          localStorage.setItem('pendingBooking', JSON.stringify({
            bookingId: existingBooking.id,
            tourId: tour.id,
            status: existingBooking.status,
            tourTitle: tour.title
          }));
        } else {
          // No existing booking found, clear everything
          setHasActiveBooking(false);
          setBookingId(null);
          setBookingStatus(null);
          localStorage.removeItem('pendingBooking');
        }
      }
    } catch (error) {
      console.error("Error checking existing bookings:", error);
    }
  };

  // Check for existing booking
  useEffect(() => {
    if (session?.user && tour?.id) {
      checkExistingBooking();
    }
  }, [session, tour]);

  // Handle payment callback when returning from SSLCommerz
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('status');
      const transactionId = urlParams.get('transactionId');
      const tranId = urlParams.get('tran_id');

      if (status && (transactionId || tranId)) {
        try {
          // Clear URL parameters
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);

          if (status === 'success') {
            toast.success("Payment successful! Booking confirmed.");

            // Clear stored data and refresh
            localStorage.removeItem('pendingBooking');
            setBookingId(null);
            setBookingStatus(null);
            setHasActiveBooking(true);

            // Refresh booking data
            setTimeout(() => {
              checkExistingBooking();
            }, 1000);

            // Redirect to bookings page
            setTimeout(() => {
              router.push("/dashboard/tourist/my-booking");
            }, 1500);
          } else if (status === 'fail' || status === 'cancel') {
            toast.error("Payment failed or cancelled. You can try again.");

            // Keep the booking for retry
            const storedBooking = localStorage.getItem('pendingBooking');
            if (storedBooking) {
              const bookingData = JSON.parse(storedBooking);
              setBookingId(bookingData.bookingId);
              setBookingStatus('FAILED');
              setHasActiveBooking(false);
            }
          }
        } catch (error) {
          console.error("Payment status check error:", error);
        }
      }
    };

    checkPaymentStatus();
  }, [router]);

  const handleBookNow = async () => {
    if (!session?.user) {
      toast.error("Please login to book a tour");
      router.push("/login");
      return;
    }

    // Check if user is a tourist
    if (session.user.role !== "TOURIST") {
      toast.error("Only tourists can book tours");
      return;
    }

    // Check if tour is active
    if (!tour?.isActive) {
      toast.error("This tour is not available for booking");
      return;
    }

    // Check if user already has an active booking for this tour
    if (hasActiveBooking && bookingStatus && !['CANCELLED', 'COMPLETED'].includes(bookingStatus)) {
      toast.error("You already have an active booking for this tour");
      return;
    }

    try {
      setBookingLoading(true);

      // Check if booking already exists 
      if (bookingId && (bookingStatus === 'PENDING' || bookingStatus === 'FAILED')) {
        // Initiate payment for existing booking
        const initResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/payment/init/${bookingId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );

        if (!initResponse.ok) {
          const error = await initResponse.json();
          throw new Error(error.message || "Failed to initiate payment");
        }

        const initResult = await initResponse.json();

        if (initResult.data?.paymentUrl) {
          toast.success("Redirecting to payment...");
          window.location.href = initResult.data.paymentUrl;
          return;
        }
      }

      const result = await BookingService.createBooking({
        tourId: tour.id,
        date: new Date().toISOString(),
      });

      if (result.booking?.id) {
        localStorage.setItem('pendingBooking', JSON.stringify({
          bookingId: result.booking.id,
          tourId: tour.id,
          tourTitle: tour.title,
        }));
        setBookingId(result.booking.id);
        setBookingStatus('PENDING');
        setHasActiveBooking(true);
      }

      if (result.paymentUrl) {
        toast.success("Booking created! Redirecting to payment...");
        window.location.href = result.paymentUrl;
      } else {
        toast.success("Booking created!");
        router.push("/dashboard/tourist/my-booking");
      }

    } catch (error: any) {
      console.error("Booking error details:", error);

      if (error.message.includes("Tourist profile not found") ||
        error.message.includes("complete your tourist profile")) {
        toast.error("Please complete your tourist profile first");
        router.push("/dashboard/my-profile");
      } else if (error.message.includes("session has expired") ||
        error.message.includes("No session found")) {
        toast.error("Your session has expired. Please login again.");
        router.push("/login");
      } else if (error.message.includes("Zod Error")) {
        toast.error("Invalid booking data. Please try again.");
      } else if (error.message.includes("Booking already paid")) {
        toast.success("Booking already paid! Redirecting to your bookings...");
        localStorage.removeItem('pendingBooking');
        setTimeout(() => {
          router.push("/dashboard/tourist/my-booking");
        }, 1500);
      } else if (error.message.includes("already booked") ||
        error.message.includes("already have an active booking")) {
        toast.error("You already have an active booking for this tour");
        // Refresh booking data
        checkExistingBooking();
      } else {
        toast.error(error.message || "Failed to create booking");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingId || !session?.user) {
      toast.error("No booking to cancel");
      return;
    }

    // Confirm before cancelling
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setBookingLoading(true);

      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/booking/status/${bookingId}`;
      const requestBody = { status: "CANCELLED" };
      const requestHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.user.accessToken}`
      };

      const response = await fetch(url, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        result = { message: responseText };
      }

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem('pendingBooking');

        // Update state
        setBookingId(null);
        setBookingStatus(null);
        setHasActiveBooking(false);

        // Show success message
        toast.success("Booking cancelled successfully");

        // Refetch existing bookings to update UI
        setTimeout(() => {
          checkExistingBooking();
        }, 500);

      } else {
        console.error("Cancel booking failed:", result);

        // Handle specific error cases
        if (response.status === 400) {
          toast.error("Invalid request. Please try again.");
        } else if (response.status === 401) {
          toast.error("Session expired. Please login again.");
          router.push("/login");
        } else if (response.status === 403) {
          toast.error("You don't have permission to cancel this booking.");
        } else if (response.status === 404) {
          toast.error("Booking not found. It may have been already cancelled.");
          setBookingId(null);
          setBookingStatus(null);
          setHasActiveBooking(false);
          localStorage.removeItem('pendingBooking');
        } else if (response.status === 409) {
          toast.error("Cannot cancel booking. It may already be confirmed or paid.");
        } else {
          throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }
      }
    } catch (error: any) {
      console.error("Cancel booking error:", error);
      toast.error(error.message || "Failed to cancel booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleBack = () => window.history.back();
  const handleViewGuide = () => {
    if (tour?.guide?.id) {
      router.push(`/guide/${tour.guide.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Updated BookNowButton with retry/cancel options
  const BookNowButton = () => {
    if (bookingLoading) {
      return (
        <Button
          className="bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 hover:text-white shadow-lg"
          disabled
        >
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </Button>
      );
    }

    if (sessionStatus === "loading") {
      return (
        <Button
          className="bg-gray-300 text-white"
          disabled
        >
          Loading...
        </Button>
      );
    }

    if (!tour?.isActive) {
      return (
        <Button
          className="bg-gray-400 text-white cursor-not-allowed"
          disabled
          title="Tour is not available for booking"
        >
          Not Available
        </Button>
      );
    }

    if (!session?.user) {
      return (
        <Button
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => {
            toast.error("Please login to book");
            router.push("/login");
          }}
        >
          Login to Book
        </Button>
      );
    }

    if (session?.user.role !== "TOURIST") {
      return (
        <Button
          className="bg-purple-500 text-white hover:bg-purple-600"
          onClick={() => toast.info("Only tourists can book tours")}
        >
          View Details
        </Button>
      );
    }

    // Check if user has an active booking (not cancelled or completed)
    if (hasActiveBooking && bookingStatus && !['CANCELLED', 'COMPLETED'].includes(bookingStatus)) {
      if (bookingStatus === 'PENDING' || bookingStatus === 'FAILED') {
        return (
          <div className="flex gap-2">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleBookNow}
            >
              {bookingStatus === 'FAILED' ? 'Retry Payment' : 'Pay Now'}
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
              onClick={handleCancelBooking}
            >
              Cancel Booking
            </Button>
          </div>
        );
      } else {
        return (
          <Button
            className="bg-blue-500 text-white cursor-not-allowed"
            disabled
            title="You already have an active booking for this tour"
          >
            Already Booked ({bookingStatus})
          </Button>
        );
      }
    }

    // If booking was cancelled or completed, show option to create new booking
    if (bookingStatus === 'COMPLETED') {
      return (
        <div className="flex gap-2">
          <Button
            className="bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={handleBookNow}
          >
            Book Again
          </Button>
        </div>
      );
    }

    // No existing booking, show Book Now button
    return (
      <Button
        className="bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 hover:text-white shadow-lg"
        onClick={handleBookNow}
      >
        Book Now
      </Button>
    );
  };

  if (loading) {
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

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The tour you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button onClick={() => router.push("/tour")}>
            Browse Tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-serif">
      {/* ---------- Banner ---------- */}
      <div className="relative w-full h-[500px] rounded-md overflow-hidden">
        {tour.images?.[0] ? (
          <Image
            src={tour.images[0]}
            alt={tour.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <BiTimeFive className="h-24 w-24 text-green-400 dark:text-green-300" />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4" style={{ backgroundColor: "rgba(17, 24, 39, 0.6)" }}>
          <p className="text-lg md:text-xl text-white mt-2 drop-shadow-md">TOUR DETAILS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {tour.title}
          </h1>
          <div className="mt-4">
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              {tour.category || "Tour"}
            </Badge>
            <Badge variant="outline" className={`ml-2 ${tour.isActive ? "bg-green-500/20 text-green-300 border-green-400/30" :
              "bg-red-500/20 text-red-300 border-red-400/30"
              }`}>
              {tour.isActive ? "Available" : "Unavailable"}
            </Badge>
            {bookingId && bookingStatus && (
              <Badge variant="outline" className={`ml-2 ${bookingStatus === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                bookingStatus === 'COMPLETED' ? 'bg-purple-500/20 text-purple-300 border-purple-400/30' :
                  'bg-blue-500/20 text-blue-300 border-blue-400/30'
                }`}>
                {bookingStatus === 'PENDING' ? 'Payment Pending' :
                  bookingStatus === 'COMPLETED' ? 'Completed' :
                    'Active'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Main Layout (Flex) ---------- */}
      <div className="w-[85vw] mx-auto my-6 flex flex-col lg:flex-row gap-6">
        {/* ---------- Left Side Content ---------- */}
        <div className="lg:w-[70%] w-full flex flex-col gap-6">
          {/* Tour Details Card */}
          <div className="p-6 bg-white dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white uppercase">{tour.title}</h1>
            <div className="border rounded-full w-fit px-2 bg-green-50 text-green-700 font-semibold mb-5">{tour.category}</div>


            {/* Info Cards */}
            <div className="flex flex-col gap-3 mb-5">
              {/* First row */}
              <div className="flex flex-wrap gap-3 justify-start">
                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <BiTimeFive className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.durationDays || 1} Days</h3>
                    <p className="text-gray-400 text-sm">Duration</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <BiDumbbell className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.physicality || "MODERATE"}</h3>
                    <p className="text-gray-400 text-sm">Physicality</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiGlobeOutline className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{tour.location}</h3>
                    <p className="text-gray-400 text-sm">Location</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <RiUserStarLine className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.ageLimit || "All ages"}</h3>
                    <p className="text-gray-400 text-sm">Age</p>
                  </div>
                </div>
              </div>

              {/* Second row */}
              <div className="flex flex-wrap gap-3 justify-start">
                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <FcOvertime className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.departureTime || "To be confirmed"}</h3>
                    <p className="text-gray-400 text-sm">Departure Time</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiTick className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.maxGroupSize || "N/A"}</h3>
                    <p className="text-gray-400 text-sm">Max Group Size</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiTick className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">${tour.packagePrice || 0}</h3>
                    <p className="text-gray-400 text-sm">Package Price</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiTick className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">${tour.guideFee || (tour.guide?.dailyRate ? tour.guide.dailyRate * tour.durationDays : 0)}</h3>
                    <p className="text-gray-400 text-sm">Guide Fee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back & Book Now buttons */}
            <div className="flex gap-3 my-5">
              <Button
                variant="outline"
                className="bg-green-600 text-white border-green-500 hover:bg-green-700 hover:text-white shadow-lg"
                onClick={handleBack}
              >
                Back
              </Button>
              <BookNowButton />
            </div>

            {/* Description */}
            <div className="my-5">
              <h3 className="text-lg font-semibold uppercase mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{tour.description || "No description available for this tour."}</p>
            </div>
          </div>

          <hr />
          {/* Guide Information Card - Keep as is */}
          {tour.guide && (
            <div className=" p-6 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase">
                  Your Guide
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewGuide}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300"
                >
                  View Full Profile
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Guide Profile */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {tour.guide.profilePic ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-200 dark:border-green-800">
                        <Image
                          width={96}
                          height={96}
                          src={tour.guide.profilePic}
                          alt={tour.guide.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center border-4 border-green-200 dark:border-green-800">
                        <span className="text-3xl font-bold text-green-600 dark:text-green-300">
                          {tour.guide.name?.charAt(0) || "G"}
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tour.guide.name}</h3>
                      <p className="font-medium text-gray-700 dark:text-white hover:text-blue-500 hover:underline">{tour.guide.email}</p>

                    </div>


                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">



                    {/* 
                    {tour.guide.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <MdPhone className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="font-medium text-gray-900 dark:text-white">{tour.guide.phone}</p>
                        </div>
                      </div>
                    )}

                    {tour.guide.bio && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">About Guide</p>
                        <p className="text-gray-700 dark:text-gray-300">{tour.guide.bio}</p>
                      </div>
                    )} */}

                    {/* Languages */}
                    {/* {tour.guide.languages && tour.guide.languages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                          <FaLanguage className="h-4 w-4" />
                          Languages
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tour.guide.languages.map((lang: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )} */}

                    {/* Expertise */}
                    {tour.guide.expertise && tour.guide.expertise.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Areas of Expertise</p>
                        <div className="flex flex-wrap gap-2">
                          {tour.guide.expertise.map((exp: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Daily Rate */}
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Daily Rate</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ${tour.guide.dailyRate}/day
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total for {tour.durationDays} days</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${tour.guide.dailyRate * tour.durationDays}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <hr />
          {/* Tour Details Sections - Keep as is */}
          <div className=" p-6 bg-white dark:bg-gray-800">
            {/* Departure / Meeting Point */}
            <div className="flex flex-col md:flex-row gap-3 my-5">
              <h3 className="text-lg font-semibold md:w-[40%] flex items-center gap-2">
                <MdLocationOn />
                MEETING POINT / DEPARTURE
              </h3>
              <p className="md:w-[60%] text-gray-700 dark:text-gray-300"><span className="font-bold">{tour.meetingPoint || "To be confirmed"}</span> <br /> {tour.departureTime || "To be confirmed"} <br /> {tour.departure || "To be confirmed"} </p>
            </div>

            <hr />

            {/* Included Locations */}
            {tour.includedLocations?.length > 0 && (
              <>
                <div className="flex flex-col md:flex-row gap-3 my-5">
                  <h3 className="text-lg font-semibold italic md:w-[40%]">INCLUDED LOCATIONS</h3>
                  <div className="flex flex-wrap md:w-[60%] gap-2">
                    {tour.includedLocations.map((inc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 mx-2">
                        <TiTick className="text-green-600 h-6 w-6" />
                        <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
              </>
            )}

            {/* Not Included Locations */}
            {tour.notIncludedLocations?.length > 0 && (
              <>
                <div className="flex flex-col md:flex-row gap-3 my-5">
                  <h3 className="text-lg font-semibold italic md:w-[40%]">NOT INCLUDED LOCATIONS</h3>
                  <div className="flex flex-wrap md:w-[60%] gap-2">
                    {tour.notIncludedLocations.map((inc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 mx-2">
                        <ImCross className="text-red-700 h-4 w-4" />
                        <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
              </>
            )}

            {/* Price Includes */}
            {tour.priceIncludes?.length > 0 && (
              <>
                <div className="flex flex-col md:flex-row gap-3 my-5">
                  <h3 className="text-lg font-semibold italic md:w-[40%]">PRICE INCLUDES</h3>
                  <div className="flex flex-wrap md:w-[60%] gap-2">
                    {tour.priceIncludes.map((inc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 mx-2">
                        <TiTick className="text-green-600 h-6 w-6" />
                        <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
              </>
            )}

            {/* Price Excludes */}
            {tour.priceExcludes?.length > 0 && (
              <>
                <div className="flex flex-col md:flex-row gap-3 my-5">
                  <h3 className="text-lg font-semibold italic md:w-[40%]">PRICE EXCLUDES</h3>
                  <div className="flex flex-wrap md:w-[60%] gap-2">
                    {tour.priceExcludes.map((inc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 mx-2">
                        <ImCross className="text-red-700 h-4 w-4" />
                        <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
              </>
            )}

            {/* Itinerary */}
            {itineraryData.length > 0 && (
              <>
                <div className="my-5">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <MdCalendarToday />
                    ITINERARY - {tour.durationDays} DAYS
                  </h3>
                  <div className="space-y-4">
                    {itineraryData.map((item: string, i: number) => {
                      // Clean up the item by removing quotes and backslashes
                      const cleanItem = item
                        .replace(/^["']+|["']+$/g, '') // Remove surrounding quotes
                        .replace(/\\/g, '') // Remove backslashes
                        .trim();

                      return (
                        <div key={i} className="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-r-lg">
                          <div className="flex items-start gap-3">

                            <div className="flex-1">
                              <p className="text-gray-700 dark:text-gray-300 font-medium">{cleanItem}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
              </>
            )}

            {/* Tour Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-5">
              <div className="flex items-center gap-2">
                <span className="font-medium">Created:</span>
                <span>{formatDate(tour.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Last Updated:</span>
                <span>{formatDate(tour.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Right Side Gallery (30%) ---------- */}
        <div className="lg:w-[30%] w-full space-y-6">
          {/* Gallery Card */}
          <div className="dark:bg-gray-800">
            <h2 className="text-2xl font-semibold my-5 uppercase">Gallery</h2>

            <PhotoProvider>
              <div className="grid grid-cols-1 gap-3">
                {tour.images?.length ? (
                  tour.images.map((img: string, i: number) => (
                    <PhotoView key={i} src={img}>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in group">
                        <Image
                          height={192}
                          width={400}
                          src={img}
                          alt={`tour-image-${i}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      </div>
                    </PhotoView>
                  ))
                ) : (
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <p className="text-gray-400">No images available</p>
                  </div>
                )}
              </div>
            </PhotoProvider>

            {/* Image Count */}
            {tour.images && tour.images.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                {tour.images.length} photo{tour.images.length !== 1 ? 's' : ''} available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}