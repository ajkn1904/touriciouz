"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDumbbell, BiTimeFive } from "react-icons/bi";
import { TiGlobeOutline, TiTick } from "react-icons/ti";
import { RiUserStarLine } from "react-icons/ri";
import { FcOvertime } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};

  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/tours/${id}`
        );
        const data = await res.json();
        setTour(data?.data);
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

  const handleBack = () => router.push("/tour");
  const handleBookNow = () => alert("Booking feature coming soon!");

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
</div>

</div>



      {/* ---------- Main Layout (Flex) ---------- */}
      <div className="w-[85vw] mx-auto my-6 flex flex-col lg:flex-row gap-6">


        {/* ---------- Left Side Content ---------- */}
        <div className="lg:w-[70%] w-full border shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-3">{tour.title}</h1>
          <p className="text-lg text-gray-600 mb-5">{tour.category}</p>

          {/* Info Cards */}
<div className="flex flex-col gap-3 mb-5">

  {/* First row */}
  <div className="flex flex-wrap gap-3 justify-start">
    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <BiTimeFive className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">{tour.durationDays} Days</h3>
        <p className="text-gray-400 text-sm">Duration</p>
      </div>
    </div>

    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <BiDumbbell className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">{tour.physicality || "N/A"}</h3>
        <p className="text-gray-400 text-sm">Physicality</p>
      </div>
    </div>

    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <TiGlobeOutline className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">{tour.location}</h3>
        <p className="text-gray-400 text-sm">Location</p>
      </div>
    </div>

    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <RiUserStarLine className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">{tour.ageLimit || "N/A"}</h3>
        <p className="text-gray-400 text-sm">Age</p>
      </div>
    </div>
  </div>

  {/* Second row */}
  <div className="flex flex-wrap gap-3 justify-start">
    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <FcOvertime className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">{tour.departureTime || "N/A"}</h3>
        <p className="text-gray-400 text-sm">Departure Time</p>
      </div>
    </div>

    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <TiTick className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">{tour.maxGroupSize}</h3>
        <p className="text-gray-400 text-sm">Max Group Size</p>
      </div>
    </div>

    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <TiTick className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">${tour.packagePrice}</h3>
        <p className="text-gray-400 text-sm">Package Price</p>
      </div>
    </div>

    <div className="flex-1 min-w-[180px] max-w-[calc(25%-0.75rem)] flex items-center gap-3 border p-4">
      <TiTick className="h-6 w-6 text-green-700" />
      <div>
        <h3 className="text-lg font-semibold">${tour.guideFee}</h3>
        <p className="text-gray-400 text-sm">Guide Fee</p>
      </div>
    </div>
  </div>
</div>


          {/* Back & Book Now buttons */}
          <div className="flex gap-3 my-5">
            <Button
              className="btn bg-green-600 text-white border-green-500 border-2 hover:border-yellow-500 shadow-lg"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className="btn bg-yellow-500 text-white border-yellow-600 border-2 hover:border-green-500 shadow-lg"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>

          {/* Description */}
          <p className="text-lg my-5">{tour.description}</p>

          {/* Departure / Meeting Point */}
          <hr className="border-green-200" />
          <div className="flex flex-col md:flex-row gap-3 my-5">
            <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600">
              DEPARTURE / MEETING POINT
            </h3>
            <p className="md:w-[60%]">{tour.departure} / {tour.meetingPoint}</p>
          </div>

          {/* Included Locations */}
          <hr className="border-green-200" />
          <div className="flex flex-col md:flex-row gap-3 my-5">
            <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600">INCLUDED LOCATIONS</h3>
            <div className="flex flex-wrap md:w-[60%] gap-2">
              {tour.includedLocations?.map((inc: string, i: number) => (
                <div key={i} className="flex items-center gap-2 mx-2">
                  <TiTick className="text-green-600 h-6 w-6" />
                  <p>{inc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Not Included Locations */}
          <hr className="border-green-200" />
          <div className="flex flex-col md:flex-row gap-3 my-5">
            <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600">NOT INCLUDED LOCATIONS</h3>
            <div className="flex flex-wrap md:w-[60%] gap-2">
              {tour.notIncludedLocations?.map((inc: string, i: number) => (
                <div key={i} className="flex items-center gap-2 mx-2">
                  <ImCross className="text-red-700 h-4 w-4" />
                  <p>{inc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Includes */}
          <hr className="border-green-200" />
          <div className="flex flex-col md:flex-row gap-3 my-5">
            <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600">PRICE INCLUDES</h3>
            <div className="flex flex-wrap md:w-[60%] gap-2">
              {tour.priceIncludes?.map((inc: string, i: number) => (
                <div key={i} className="flex items-center gap-2 mx-2">
                  <TiTick className="text-green-600 h-6 w-6" />
                  <p>{inc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Excludes */}
          <hr className="border-green-200" />
          <div className="flex flex-col md:flex-row gap-3 my-5">
            <h3 className="text-lg font-semibold italic md:w-[40%] text-blue-600">PRICE EXCLUDES</h3>
            <div className="flex flex-wrap md:w-[60%] gap-2">
              {tour.priceExcludes?.map((inc: string, i: number) => (
                <div key={i} className="flex items-center gap-2 mx-2">
                  <ImCross className="text-red-700 h-4 w-4" />
                  <p>{inc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          {tour.itinerary && (
            <>
              <hr className="border-green-200" />
              <div className="my-5">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">ITINERARY</h3>
                <ul className="list-disc list-inside">
                  {tour.itinerary.split("\n").map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* ---------- Right Side Gallery (30%) ---------- */}
        <div className="lg:w-[30%] w-full">
          <h2 className="text-2xl font-semibold my-5 text-blue-700">Gallery</h2>

          <PhotoProvider>
            <div className="grid grid-cols-1 gap-3">
              {tour.images?.length
                ? tour.images.map((img: string, i: number) => (
                    <PhotoView key={i} src={img}>
                      <Image height={400} width={400}
                        src={img}
                        alt={`tour-image-${i}`}
                        className="w-full h-40 object-cover rounded-md shadow-md hover:scale-[1.03] transition cursor-zoom-in"
                      />
                    </PhotoView>
                  ))
                : <p className="text-gray-400">No images available</p>}
            </div>
          </PhotoProvider>
        </div>
      </div>
    </div>
  );
}
