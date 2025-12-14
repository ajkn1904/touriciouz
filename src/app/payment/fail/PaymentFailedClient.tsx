/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";

export default function PaymentFailedClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const tid = searchParams.get("transactionId");
    if (tid) setTransactionId(tid);
    toast.error("Payment failed");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-3">Payment Failed</h1>

        {transactionId && (
          <p className="mb-4 text-sm">Transaction ID: {transactionId}</p>
        )}

        <div className="space-y-2">
          <Button className="w-full" onClick={() => router.push("/tour")}>
            Retry Payment
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
