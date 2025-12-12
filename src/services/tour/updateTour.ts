/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";

export async function updateTourAction(id: string, token: string, formData: FormData) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${baseUrl}/tours/${id}`, {
            method: "PATCH",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                // DO NOT set Content-Type - let browser set it
            },
        });

        const raw = await response.text();
        console.log("Response status:", response.status);
        console.log("Response raw (first 500 chars):", raw.substring(0, 500));
        
        let result;
        try {
            result = JSON.parse(raw);
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            console.error("Raw response that failed to parse:", raw);
            
            if (response.ok) {
                // If response is OK but not JSON, maybe it's empty or plain text
                return {
                    success: true,
                    message: raw || "Updated successfully"
                };
            } else {
                throw new Error(`Server error: ${response.status} ${response.statusText}. Response: ${raw.substring(0, 200)}`);
            }
        }

        if (response.ok) {
            revalidateTag('tours', { expire: 0 });
            revalidateTag(`tour-${id}`, { expire: 0 });
            
            return {
                success: true,
                data: result.data || result
            };
        } else {
            return {
                success: false,
                message: result.message || result.error || `Server error: ${response.status}`,
                error: result.error
            };
        }
    } catch (error: any) {
        console.error("Error updating tour:", error);
        return {
            success: false,
            message: error.message || "Failed to update tour",
            error: error.message
        };
    }
}