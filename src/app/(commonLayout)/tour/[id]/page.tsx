"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDumbbell, BiTimeFive } from "react-icons/bi";
import { TiGlobeOutline, TiTick } from "react-icons/ti";
import { RiUserStarLine, RiMailLine, RiPhoneLine, RiUser3Line, RiStarFill } from "react-icons/ri";
import { FcOvertime } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday } from "react-icons/md";
import { FaUser, FaStar, FaTrophy, FaLanguage } from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

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
  meetingPoint?: string;
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
    createdAt?: string;
  } | null;
  images?: string[];
  status?: string;
  ageLimit?: string;
  departureTime?: string;
  guideFee?: number;
  includedLocations?: string[];
  notIncludedLocations?: string[];
  priceIncludes?: string[];
  priceExcludes?: string[];
  itinerary?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours/${id}`
        );
        const data = await res.json();
        setTour(data?.data || data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <p className="text-gray-400 text-center p-6">Loading tour details...</p>;
  if (!tour) return <p className="text-red-500 text-center p-6">Tour not found</p>;

  const handleBack = () => window.history.back();
  const handleBookNow = () => alert("Booking feature coming soon!");
  const handleViewGuide = () => {
    if (tour.guide?.id) {
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

  return (
    <div className="font-serif">

      {/* ---------- Banner ---------- */}
      <div className="relative w-full h-[500px] rounded-md overflow-hidden">
        <Image
          src={tour.images?.[0] || "/placeholder.png"}
          alt={tour.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4" style={{ backgroundColor: "rgba(17, 24, 39, 0.6)" }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            TOUR DETAILS
          </h1>
          <p className="text-lg md:text-xl text-white mt-2 drop-shadow-md">{tour.title}</p>
          <div className="mt-4">
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              {tour.category}
            </Badge>
            {tour.status && (
              <Badge variant="outline" className={`ml-2 ${
                tour.status === "ACTIVE" ? "bg-green-500/20 text-green-300 border-green-400/30" :
                tour.status === "INACTIVE" ? "bg-red-500/20 text-red-300 border-red-400/30" :
                "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
              }`}>
                {tour.status}
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
          <div className="border shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{tour.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-5">{tour.category}</p>

            {/* Info Cards */}
            <div className="flex flex-col gap-3 mb-5">
              {/* First row */}
              <div className="flex flex-wrap gap-3 justify-start">
                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <BiTimeFive className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.durationDays} Days</h3>
                    <p className="text-gray-400 text-sm">Duration</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <BiDumbbell className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.physicality || "N/A"}</h3>
                    <p className="text-gray-400 text-sm">Physicality</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiGlobeOutline className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.location}</h3>
                    <p className="text-gray-400 text-sm">Location</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <RiUserStarLine className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.ageLimit || "N/A"}</h3>
                    <p className="text-gray-400 text-sm">Age</p>
                  </div>
                </div>
              </div>

              {/* Second row */}
              <div className="flex flex-wrap gap-3 justify-start">
                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <FcOvertime className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.departureTime || "N/A"}</h3>
                    <p className="text-gray-400 text-sm">Departure Time</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiTick className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tour.maxGroupSize}</h3>
                    <p className="text-gray-400 text-sm">Max Group Size</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <TiTick className="h-6 w-6 text-green-700 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">${tour.packagePrice}</h3>
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
              <Button
                className="bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 hover:text-white shadow-lg"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>

            {/* Description */}
            <div className="my-5">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{tour.description}</p>
            </div>
          </div>

          {/* Guide Information Card */}
          {tour.guide && (
            <div className="border shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaUser className="text-orange-500" />
                  Your Guide
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewGuide}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Full Profile
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Guide Profile */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {tour.guide.profilePic ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200 dark:border-orange-800">
                        <Image
                          width={96}
                          height={96}
                          src={tour.guide.profilePic}
                          alt={tour.guide.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center border-4 border-orange-200 dark:border-orange-800">
                        <span className="text-3xl font-bold text-orange-600 dark:text-orange-300">
                          {tour.guide.name?.charAt(0) || "G"}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tour.guide.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <RiStarFill className="h-5 w-5 text-amber-500" />
                          <span className="ml-1 font-bold">{tour.guide.rating?.toFixed(1) || "0.0"}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <FaTrophy className="h-4 w-4 text-purple-500 mr-1" />
                          <span>{tour.guide.totalTours || 0} tours</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <MdEmail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{tour.guide.email}</p>
                      </div>
                    </div>

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
                    )}

                    {/* Languages */}
                    {tour.guide.languages && tour.guide.languages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                          <FaLanguage className="h-4 w-4" />
                          Languages
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tour.guide.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expertise */}
                    {tour.guide.expertise && tour.guide.expertise.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Areas of Expertise</p>
                        <div className="flex flex-wrap gap-2">
                          {tour.guide.expertise.map((exp, index) => (
                            <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200">
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

          {/* Tour Details Sections */}
          <div className="border shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800">
            {/* Departure / Meeting Point */}
            <div className="flex flex-col md:flex-row gap-3 my-5">
              <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <MdLocationOn />
                DEPARTURE / MEETING POINT
              </h3>
              <p className="md:w-[60%] text-gray-700 dark:text-gray-300">{tour.departure} / {tour.meetingPoint || "To be confirmed"}</p>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Included Locations */}
            <div className="flex flex-col md:flex-row gap-3 my-5">
              <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600 dark:text-blue-400">INCLUDED LOCATIONS</h3>
              <div className="flex flex-wrap md:w-[60%] gap-2">
                {tour.includedLocations?.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 mx-2">
                    <TiTick className="text-green-600 h-6 w-6" />
                    <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Not Included Locations */}
            <div className="flex flex-col md:flex-row gap-3 my-5">
              <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600 dark:text-blue-400">NOT INCLUDED LOCATIONS</h3>
              <div className="flex flex-wrap md:w-[60%] gap-2">
                {tour.notIncludedLocations?.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 mx-2">
                    <ImCross className="text-red-700 h-4 w-4" />
                    <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Price Includes */}
            <div className="flex flex-col md:flex-row gap-3 my-5">
              <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600 dark:text-blue-400">PRICE INCLUDES</h3>
              <div className="flex flex-wrap md:w-[60%] gap-2">
                {tour.priceIncludes?.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 mx-2">
                    <TiTick className="text-green-600 h-6 w-6" />
                    <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Price Excludes */}
            <div className="flex flex-col md:flex-row gap-3 my-5">
              <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600 dark:text-blue-400">PRICE EXCLUDES</h3>
              <div className="flex flex-wrap md:w-[60%] gap-2">
                {tour.priceExcludes?.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 mx-2">
                    <ImCross className="text-red-700 h-4 w-4" />
                    <p className="text-gray-700 dark:text-gray-300">{inc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            {tour.itinerary && (
              <>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="my-5">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <MdCalendarToday />
                    ITINERARY
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {tour.itinerary.split("\n").map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-300">{i + 1}</span>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Tour Metadata */}
            <hr className="border-gray-200 dark:border-gray-700" />
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-5">
              <div className="flex items-center gap-2">
                <span className="font-medium">Tour ID:</span>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{tour.id}</code>
              </div>
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
          <div className="border shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold my-5 text-blue-700 dark:text-blue-400">Gallery</h2>

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

          {/* Quick Stats Card */}
          <div className="border shadow-lg rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Category</span>
                <Badge variant="secondary">{tour.category}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Physicality</span>
                <span className="font-medium text-gray-900 dark:text-white">{tour.physicality}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Max Group</span>
                <span className="font-medium text-gray-900 dark:text-white">{tour.maxGroupSize} people</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Age Limit</span>
                <span className="font-medium text-gray-900 dark:text-white">{tour.ageLimit || "None"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Duration</span>
                <span className="font-medium text-gray-900 dark:text-white">{tour.durationDays} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Price</span>
                <span className="font-bold text-green-600 dark:text-green-400">${tour.packagePrice}</span>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="border shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tour Status</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              tour.status === "ACTIVE" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
              tour.status === "INACTIVE" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
              tour.status === "PENDING" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
              "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
            }`}>
              <div className={`w-3 h-3 rounded-full mr-2 ${
                tour.status === "ACTIVE" ? "bg-green-500" :
                tour.status === "INACTIVE" ? "bg-red-500" :
                tour.status === "PENDING" ? "bg-yellow-500" :
                "bg-gray-500"
              }`}></div>
              {tour.status || "ACTIVE"}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              {tour.status === "ACTIVE" ? "This tour is currently available for booking." :
               tour.status === "INACTIVE" ? "This tour is currently not available." :
               tour.status === "PENDING" ? "This tour is pending approval." :
               "Status unknown."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}