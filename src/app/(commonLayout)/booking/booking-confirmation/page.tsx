/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, DollarSign, Calendar, MapPin, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { toast } from "sonner";
import { BookingService } from "@/src/services/booking/bookingSercvice.Action";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);

  const transactionId = searchParams.get("transactionId");
  const status = searchParams.get("status");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const validatePayment = async () => {
      if (!transactionId) {
        router.push("/tours");
        return;
      }

      try {
        // You might want to fetch booking details by transaction ID
        // For now, we'll just show the status
        setBooking({
          transactionId,
          status,
          amount,
        });
      } catch (error) {
        toast.error("Failed to validate payment");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    validatePayment();
  }, [transactionId, status, amount, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: "Payment Successful!",
          message: "Your booking has been confirmed.",
          color: "bg-green-100 text-green-800",
          buttonText: "View My Bookings",
          buttonAction: () => router.push("/bookings"),
        };
      case "fail":
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: "Payment Failed",
          message: "Your payment was not successful. Please try again.",
          color: "bg-red-100 text-red-800",
          buttonText: "Try Again",
          buttonAction: () => router.back(),
        };
      case "cancel":
        return {
          icon: <XCircle className="w-16 h-16 text-yellow-500" />,
          title: "Payment Cancelled",
          message: "Your payment was cancelled.",
          color: "bg-yellow-100 text-yellow-800",
          buttonText: "Back to Tours",
          buttonAction: () => router.push("/tours"),
        };
      default:
        return {
          icon: <Clock className="w-16 h-16 text-blue-500" />,
          title: "Payment Pending",
          message: "Your payment is being processed.",
          color: "bg-blue-100 text-blue-800",
          buttonText: "Back to Home",
          buttonAction: () => router.push("/"),
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">{config.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{config.title}</h1>
          <p className="text-gray-600 mb-6">{config.message}</p>
          
          <Badge className={`px-4 py-2 text-lg ${config.color}`}>
            {status?.toUpperCase() || "PENDING"}
          </Badge>
        </div>

        <div className="space-y-4 mb-8">
          {transactionId && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Transaction ID</span>
              </div>
              <code className="font-mono text-sm">{transactionId}</code>
            </div>
          )}

          {amount && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Amount Paid</span>
              </div>
              <span className="font-bold text-lg text-green-600">${amount}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Date</span>
            </div>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={config.buttonAction}
            className="w-full py-3 text-lg"
          >
            {config.buttonText}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push("/tours")}
            className="w-full py-3 text-lg"
          >
            Browse More Tours
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? Contact our support team at support@example.com
        </p>
      </div>
    </div>
  );
}