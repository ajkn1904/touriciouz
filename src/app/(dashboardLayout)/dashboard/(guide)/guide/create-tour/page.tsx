/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { tourFormSchema, TourFormType } from "@/src/zodValidations/tour.validation";
import { createTourAction } from "@/src/services/tour/createTourActions";
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
import { toast } from "sonner";



function getDefaultDepartureDate() {
  return new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
}

export default function CreateTourPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const defaultValues: Partial<TourFormType> = {
    title: "Test",
    description: "Testing functionality",
    category: "HISTORY",
    packagePrice: 1000,
    durationDays: 1,
    location: "Dhaka",
    physicality: "Medium",
    departure: getDefaultDepartureDate(),
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
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TourFormType>({
    resolver: zodResolver(tourFormSchema as any),
    defaultValues,
  });

  const onSubmit = async (data: TourFormType) => {
    //console.log("Form data submitted:", data); 
    setLoading(true);
    setServerError("");

    const fd = new FormData();
    const payload: any = {};

    const formattedData = { ...data, itinerary: JSON.stringify(data.itinerary || []) };

    // Append non-file fields
    Object.entries(formattedData).forEach(([key, value]) => {
      if (key === "images") return;
      payload[key] = value;
    });
    fd.append("data", JSON.stringify(payload));

    // Append image files
    const files = data.images || [];
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }

    const token = session?.user?.accessToken as string;
    if (!token) {
      setServerError("User not authenticated");
      setLoading(false);
      return;
    }

    const result = await createTourAction(token, fd);
    setLoading(false);

    if (result.error) {
      setServerError(result.error);
      return;
    }

    reset();
    toast.success("Tour Created Successfully!");
    router.push("/tour");
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create New Tour</h1>

      {serverError && (
        <p className="text-red-500 border border-red-400 p-2 rounded">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        {/* TITLE */}
        <div>
          <Label>Title</Label>
          <Input {...register("title")} placeholder="Tour Title" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <Textarea {...register("description")} placeholder="Description" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* CATEGORY + PHYSICALITY */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || "HISTORY"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                    <SelectItem value="FOOD">FOOD</SelectItem>
                    <SelectItem value="NIGHTLIFE">NIGHTLIFE</SelectItem>
                    <SelectItem value="SHOPPING">SHOPPING</SelectItem>
                    <SelectItem value="ADVENTURE">ADVENTURE</SelectItem>
                    <SelectItem value="CULTURE">CULTURE</SelectItem>
                    <SelectItem value="ART">ART</SelectItem>
                    <SelectItem value="NATURE">NATURE</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="w-full">
            <Label>Physicality</Label>
            <Controller
              control={control}
              name="physicality"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || "Medium"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Physicality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* ITINERARY */}
        <div>
          <Label>Itinerary</Label>
          <Controller
            control={control}
            name="itinerary"
            render={({ field }) => (
              <ItineraryInput value={field.value || []} onChange={field.onChange} />
            )}
          />
        </div>

        {/* PRICE + DURATION */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Package Price</Label>
            <Input type="number" {...register("packagePrice")} />
          </div>
          <div className="w-full">
            <Label>Duration (Days)</Label>
            <Input type="number" {...register("durationDays")} />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <Label>Location</Label>
          <Input {...register("location")} />
        </div>

        {/* MEETING POINT */}
        <div>
          <Label>Meeting Point</Label>
          <Input {...register("meetingPoint")} />
        </div>

        {/* GROUP SIZE + AGE LIMIT */}
        <div className="flex gap-3">
          <div className="w-full">
            <Label>Max Group Size</Label>
            <Input type="number" {...register("maxGroupSize")} />
          </div>
          <div className="w-full">
            <Label>Age Limit</Label>
            <Input type="number" {...register("ageLimit")} />
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
              <TagsInput value={field.value || []} onChange={field.onChange} />
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
              <TagsInput value={field.value || []} onChange={field.onChange} />
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
              <TagsInput value={field.value || []} onChange={field.onChange} />
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
              <TagsInput value={field.value || []} onChange={field.onChange} />
            )}
          />
        </div>

        {/* IMAGES */}
        <div>
          <Label>Images</Label>
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <MultipleImageUploader onChange={field.onChange} />
            )}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-3">
          {loading ? "Creating..." : "Create Tour"}
        </Button>
      </form>
    </div>
  );
}
