/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/src/utils/server-fetch";
import { revalidateTag } from "next/cache";

export async function updateTourAction(id: string, token: string, formData: FormData) {
    try {
        const response = await serverFetch.patch(`/tours/${id}`, {
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const raw = await response.text();
        let result;
        try {
            result = JSON.parse(raw);
        } catch {
            throw new Error(raw);
        }

        if (response.ok && result.success) {
            // Invalidate caches after update
            revalidateTag('tours', { expire: 0 });
            revalidateTag(`tour-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error("Error updating tour:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to update tour",
        };
    }
}
