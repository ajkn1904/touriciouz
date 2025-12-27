/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

import { tourFormSchema, TourFormType } from "@/src/zodValidations/tour.validation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import MultipleImageUploader from "@/src/components/MultipleImageUploader";
import TagsInput from "@/src/utils/TagsInput";
import ItineraryInput from "@/src/utils/ItineraryInput";

import { getTourById } from "@/src/services/tour/getTourById";
import { updateTourAction } from "@/src/services/tour/updateTour";

// Image compression function
const compressImageFile = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.09, // 90KB to stay safely under 100KB limit
    maxWidthOrHeight: 800, // Resize to max 800px width or height
    useWebWorker: true, // Use web worker for better performance
    fileType: file.type.includes('image') ? file.type : 'image/jpeg',
  };

  try {
    //console.log(`Compressing: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
    const compressedFile = await imageCompression(file, options);
    //console.log(`Compressed: ${file.name} (${(compressedFile.size / 1024).toFixed(2)}KB)`);
    
    // Convert back to File object with original name
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Error compressing image:", error);
    // Fallback to original file if compression fails
    return file;
  }
};

export default function EditTourPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TourFormType>({
    resolver: zodResolver(tourFormSchema as any),
    defaultValues: {
      title: "",
      description: "",
      category: "HISTORY",
      packagePrice: 0,
      durationDays: 1,
      location: "",
      physicality: "Medium",
      departure: "",
      departureTime: "10:00",
      meetingPoint: "",
      maxGroupSize: 10,
      ageLimit: "3",
      itinerary: [],
      includedLocations: [],
      notIncludedLocations: [],
      priceIncludes: [],
      priceExcludes: [],
      images: [],
    },
  });

  // Fetch tour by ID
  useEffect(() => {
    if (!session?.user?.accessToken) return;

    const fetchTour = async () => {
      setLoading(true);
      try {
        const tour = await getTourById(tourId);
        if (!tour) throw new Error("Tour not found");

        const formData: TourFormType = {
          title: tour.title,
          description: tour.description,
          category: tour.category,
          packagePrice: tour.packagePrice,
          durationDays: tour.durationDays,
          location: tour.location || "",
          physicality: tour.physicality || "Medium",
          departure: tour.departure?.split("T")[0] || "",
          departureTime: tour.departureTime || "10:00",
          meetingPoint: tour.meetingPoint || "",
          maxGroupSize: tour.maxGroupSize || 10,
          ageLimit: tour.ageLimit?.toString() || "3",
          itinerary: tour.itinerary ? JSON.parse(tour.itinerary) : [],
          includedLocations: tour.includedLocations || [],
          notIncludedLocations: tour.notIncludedLocations || [],
          priceIncludes: tour.priceIncludes || [],
          priceExcludes: tour.priceExcludes || [],
          images: tour.images || [],
        };

        reset(formData);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Failed to fetch tour");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [session?.user?.accessToken, tourId, reset]);

  const onSubmit = async (data: TourFormType) => {
    if (!session?.user?.accessToken) {
      setServerError("User not authenticated");
      return;
    }

    setLoading(true);
    setCompressing(true);
    setServerError("");

    try {
      // Process images: separate URLs from Files
      const allImages = data.images || [];
      const existingImageUrls = allImages.filter((img: any) => typeof img === 'string');
      const newImageFiles = allImages.filter((img: any) => img instanceof File);

      // console.log("=== Image Processing ===");
      // console.log("Existing URLs:", existingImageUrls.length);
      // console.log("New files to compress:", newImageFiles.length);

      // Compress new image files
      const compressedFiles: File[] = [];
      for (const file of newImageFiles) {
        const compressedFile = await compressImageFile(file);
        compressedFiles.push(compressedFile);
      }

      setCompressing(false);

      // Check if any compressed file is still too large
      const oversizedFiles = compressedFiles.filter(file => file.size > 102400); // 100KB
      if (oversizedFiles.length > 0) {
        const fileNames = oversizedFiles.map(f => f.name).join(', ');
        setServerError(`Some images are still too large after compression: ${fileNames}. Please use smaller images.`);
        setLoading(false);
        return;
      }

      // Create FormData
      const fd = new FormData();
      const payload = { 
        ...data, 
        itinerary: JSON.stringify(data.itinerary || []),
        images: existingImageUrls // Only URLs in JSON payload
      };
      
      fd.append("data", JSON.stringify(payload));

      // Append compressed files
      for (let i = 0; i < compressedFiles.length; i++) {
        fd.append("files", compressedFiles[i]);
      }

      // Debug logging
      //console.log("=== FormData Summary ===");
      //console.log("Payload size:", JSON.stringify(payload).length, "bytes");
      
      let totalFileSize = 0;
      for (let i = 0; i < compressedFiles.length; i++) {
        const file = compressedFiles[i];
        const sizeKB = file.size / 1024;
        totalFileSize += file.size;
        //console.log(`File ${i}: ${file.name}, Size: ${sizeKB.toFixed(2)}KB`);
      }
      
      //console.log("Total file size:", (totalFileSize / 1024).toFixed(2), "KB");
      //console.log("Total request size:", (JSON.stringify(payload).length + totalFileSize) / 1024, "KB");
      //console.log("=====================");

      // Call update action
      const result = await updateTourAction(tourId, session.user.accessToken, fd);

      if (!result.success) {
        let errorMessage = "Failed to update tour";
        
        if (typeof result === 'string') {
          errorMessage = result;
        } else if (result && typeof result === 'object') {
          // Handle the error object properly
          if (result.message && typeof result.message === 'string') {
            errorMessage = result.message;
          } else if (result.error && typeof result.error === 'string') {
            errorMessage = result.error;
          } else if (result.error && typeof result.error === 'object') {
            errorMessage = result.error.message || JSON.stringify(result.error);
          }
        }
        
        setServerError(errorMessage);
        setLoading(false);
        return;
      }

      toast.success("Tour Updated Successfully!");
      router.push("/dashboard/guide/guide-tour");
    } catch (err: any) {
      console.error("Submission error:", err);
      const errorMessage = err?.message || err?.toString() || "Failed to update tour";
      setServerError(errorMessage);
      setCompressing(false);
      setLoading(false);
    }
  };

  if (loading && !session) return <p className="text-center p-6">Loading tour data...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-green-600 uppercase">Edit Tour</h1>

      {/* Compression status */}
      {compressing && (
        <div className="text-blue-500 border border-blue-400 p-2 rounded bg-blue-50">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            Compressing images... Please wait.
          </div>
        </div>
      )}

      {/* Server error display */}
      {serverError && !compressing && (
        <div className="text-red-500 border border-red-400 p-2 rounded bg-red-50">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-6xl w-full md:min-w-md lg:min-w-xl xl:min-w-2xl border rounded-md p-5">
        {/* TITLE */}
        <div>
          <Label>Title</Label>
          <Input {...register("title")} placeholder="Tour Title" />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{String(errors.title.message)}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <Textarea {...register("description")} placeholder="Description" />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{String(errors.description.message)}</p>
          )}
        </div>

        {/* CATEGORY + PHYSICALITY */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["HISTORY", "FOOD", "NIGHTLIFE", "SHOPPING", "ADVENTURE", "CULTURE", "ART", "NATURE"].map(
                      (cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{String(errors.category.message)}</p>
            )}
          </div>

          <div className="w-full">
            <Label>Physicality</Label>
            <Controller
              control={control}
              name="physicality"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Physicality" />
                  </SelectTrigger>
                  <SelectContent>
                    {["High", "Medium", "Low"].map((val) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.physicality && (
              <p className="text-red-500 text-sm mt-1">{String(errors.physicality.message)}</p>
            )}
          </div>
        </div>

        {/* ITINERARY */}
        <div>
          <Label>Itinerary</Label>
          <Controller
            control={control}
            name="itinerary"
            render={({ field }) => (
              <ItineraryInput
                value={Array.isArray(field.value) ? field.value : []}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* PACKAGE PRICE + DURATION */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Package Price</Label>
            <Input type="number" {...register("packagePrice")} />
            {errors.packagePrice && (
              <p className="text-red-500 text-sm mt-1">{String(errors.packagePrice.message)}</p>
            )}
          </div>
          <div className="w-full">
            <Label>Duration (Days)</Label>
            <Input type="number" {...register("durationDays")} />
            {errors.durationDays && (
              <p className="text-red-500 text-sm mt-1">{String(errors.durationDays.message)}</p>
            )}
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <Label>Location</Label>
          <Input {...register("location")} />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{String(errors.location.message)}</p>
          )}
        </div>

        {/* MEETING POINT */}
        <div>
          <Label>Meeting Point</Label>
          <Input {...register("meetingPoint")} />
        </div>

        {/* MAX GROUP SIZE + AGE LIMIT */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Max Group Size</Label>
            <Input type="number" {...register("maxGroupSize")} />
          </div>
          <div className="w-full">
            <Label>Age Limit</Label>
            <Input type="text" {...register("ageLimit")} />
          </div>
        </div>

        {/* DEPARTURE DATE + TIME */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Departure Date</Label>
            <Input type="date" {...register("departure")} />
          </div>
          <div className="w-full">
            <Label>Departure Time</Label>
            <Input type="time" {...register("departureTime")} />
          </div>
        </div>

        {/* INCLUDED LOCATIONS */}
        <div>
          <Label>Included Locations</Label>
          <Controller
            control={control}
            name="includedLocations"
            render={({ field }) => (
              <TagsInput 
                value={field.value || []} 
                onChange={field.onChange} 
              />
            )}
          />
        </div>

        {/* EXCLUDED LOCATIONS */}
        <div>
          <Label>Excluded Locations</Label>
          <Controller
            control={control}
            name="notIncludedLocations"
            render={({ field }) => (
              <TagsInput 
                value={field.value || []} 
                onChange={field.onChange} 
              />
            )}
          />
        </div>

        {/* PRICE INCLUDES */}
        <div>
          <Label>Price Includes</Label>
          <Controller
            control={control}
            name="priceIncludes"
            render={({ field }) => (
              <TagsInput 
                value={field.value || []} 
                onChange={field.onChange} 
              />
            )}
          />
        </div>

        {/* PRICE EXCLUDES */}
        <div>
          <Label>Price Excludes</Label>
          <Controller
            control={control}
            name="priceExcludes"
            render={({ field }) => (
              <TagsInput 
                value={field.value || []} 
                onChange={field.onChange} 
              />
            )}
          />
        </div>

        {/* IMAGES */}
        <div>
          <Label>Add Images (Images will be automatically compressed to under 100KB)</Label>
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <MultipleImageUploader  
                onChange={field.onChange} 
              />
            )}
          />
          <p className="text-xs text-gray-500 mt-1">
            Note: Images are compressed to stay within the 100KB server limit.
          </p>
        </div>

        <Button 
          type="submit" 
          disabled={loading || compressing} 
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md border border-green-500 shadow-lg transition-all duration-300 hover:border-2 w-full"
        >
          {compressing ? "Compressing Images..." : 
           loading ? "Updating..." : 
           "Update Tour"}
        </Button>
      </form>
    </div>
  );
}