// tour.validation.ts
import { z } from "zod";

// Create a schema for file validation
const fileSchema = z.instanceof(File).optional();

export const tourFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  itinerary: z.array(z.string()).optional(),
  category: z.string().min(1, "Category is required"),

  packagePrice: z.coerce.number().min(0, "Price must be positive"),
  durationDays: z.coerce.number().min(1, "Duration must be at least 1 day"),

  physicality: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  meetingPoint: z.string().optional(),
  maxGroupSize: z.coerce.number().optional(),

  ageLimit: z.string().optional(),
  departure: z.string().optional(),
  departureTime: z.string().optional(),

  includedLocations: z.array(z.string()).optional(),
  notIncludedLocations: z.array(z.string()).optional(),
  priceIncludes: z.array(z.string()).optional(),
  priceExcludes: z.array(z.string()).optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

export type TourFormType = z.infer<typeof tourFormSchema>;