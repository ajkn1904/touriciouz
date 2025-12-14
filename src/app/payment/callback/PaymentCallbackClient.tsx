"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const tranId = searchParams.get("tran_id");
      const valId = searchParams.get("val_id");
      const status = searchParams.get("status");
      const amount = searchParams.get("amount");

      if (!tranId && !valId) {
        router.replace("/tour");
        return;
      }

      try {
        if (valId) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/validate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ val_id: valId }),
            }
          );

          const result = await res.json();

          if (result?.data?.status === "VALID") {
            toast.success("Payment successful");
            localStorage.removeItem("pendingBooking");
            localStorage.removeItem("paymentSession");

            router.replace(
              `/payment/success?transactionId=${tranId}&amount=${amount}&status=success`
            );
          } else {
            router.replace(`/payment/fail?transactionId=${tranId}&status=fail`);
          }
        } else if (status === "success") {
          router.replace(
            `/payment/success?transactionId=${tranId}&amount=${amount}&status=success`
          );
        } else {
          router.replace(`/payment/fail?transactionId=${tranId}&status=fail`);
        }
      } catch {
        toast.error("Payment validation error");
        router.replace("/payment/fail");
      }
    };

    run();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}
