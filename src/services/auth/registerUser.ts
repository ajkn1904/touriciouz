/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";



import { parse } from "cookie";
import { registerValidationZodSchema } from "@/src/zodValidations/register.validation";
import { zodValidator } from "@/src/utils/zodValidator";
import { serverFetch } from "@/src/utils/server-fetch";

export async function registerUser(_state: any, formData: FormData) {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    // Validate payload
    const validated = zodValidator(payload, registerValidationZodSchema);
    if (!validated.success) return validated;

    // Send request
    const res = await serverFetch.post("/user", {
      body: JSON.stringify(validated.data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();



    if (!result.success) {
      return { success: false, message: result.message };
    }

    return {
      success: true,
      message: "Account created successfully",
    };

  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
