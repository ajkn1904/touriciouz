import { z } from "zod";

export const registerValidationZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(14, "Phone must be at least 14 characters")
    .max(20, "Phone must be at most 20 characters")
    .optional(),
  role: z.enum(["TOURIST", "GUIDE"], {
    message: "Role is required"
  }),
  address: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type TRegisterValidation = z.infer<typeof registerValidationZodSchema>;
