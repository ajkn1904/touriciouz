/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setTransactionId(searchParams.get("transactionId") || "");
    setAmount(searchParams.get("amount") || "");
    toast.success("Payment successful");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          Payment Successful
        </h1>

        <p>Transaction ID: {transactionId}</p>
        <p>Amount Paid: ৳{amount}</p>

        <Button className="w-full mt-4" onClick={() => router.push("/dashboard/tourist/my-booking")}>
          View My Bookings
        </Button>
      </div>
    </div>
  );
}
