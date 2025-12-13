"use client";

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useSession } from 'next-auth/react';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string>('');
  const [tourId, setTourId] = useState<string>('');
  const [bookingId, setBookingId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(true);
  const hasProcessed = useRef(false);
  const { data: session } = useSession()
  const token = session?.user.accessToken

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processPaymentFailed = () => {
      try {
        const transactionIdParam = searchParams.get('transactionId');
        const amount = searchParams.get('amount');
        const status = searchParams.get('status');

        // console.log('Payment Failed Params:', {
        //   transactionId: transactionIdParam,
        //   amount,
        //   status
        // });

        // Get booking info from localStorage
        const storedBooking = localStorage.getItem('pendingBooking');

        if (storedBooking) {
          try {
            const bookingData = JSON.parse(storedBooking);
            setTimeout(() => {
              setTourId(bookingData.tourId);
              setBookingId(bookingData.bookingId);
            }, 0);
          } catch (error) {
            console.error('Error parsing stored booking:', error);
          }
        }

        if (transactionIdParam) {
          setTimeout(() => {
            setTransactionId(transactionIdParam);
          }, 0);
        }

        if (status === 'fail') {
          toast.error('Payment failed. You can try again.');
        }
        setIsProcessing(false);



      } catch (error) {
        console.error('Payment failed processing error:', error);
        setIsProcessing(false);
      }
    };

    processPaymentFailed();

    return () => {
      hasProcessed.current = true;
    };
  }, [searchParams, router, tourId]);

  const handleRetryPayment = () => {
    setIsProcessing(false);
    if (tourId) {
      router.push(`/tour/${tourId}`);
    } else {
      router.push('/tour');
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingId) {
      toast.error('No booking found to cancel');
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/booking/status/${bookingId}`;
      const requestBody = { status: "CANCELLED" };
      const requestHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const response = await fetch(url, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        toast.success('Booking cancelled successfully');
        localStorage.removeItem('pendingBooking');
        localStorage.removeItem('paymentSession');
        setIsProcessing(false);
        router.push('/tour');
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
    }
  };

  // Show loading state
  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                <XCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Processing Payment...</h1>
            <p className="text-red-100">Please wait while we verify your payment status</p>
          </div>

          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Checking payment details and updating booking status...
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <XCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Failed ❌</h1>
          <p className="text-red-100">We couldn`&apos;`t process your payment</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Transaction Details */}
          {transactionId && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Transaction Reference
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Reference ID:</span>
                <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                  {transactionId}
                </span>
              </div>
            </div>
          )}

          {/* Possible Reasons */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Possible Reasons
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Insufficient funds in your account
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Incorrect card details or expired card
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Transaction declined by your bank
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Network or technical issues
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRetryPayment}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Retry Payment
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCancelBooking}
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
              >
                Cancel Booking
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push('/tour')}
                className="w-full"
              >
                Browse Tours
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Note:</strong> Your booking is still saved. You can retry payment
                from the tour page. Failed transactions are usually refunded within 3-7 business days.
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need immediate assistance?{' '}
                <a href="mailto:support@tourapp.com" className="text-red-600 hover:underline">
                  Contact Support
                </a>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Phone: +880 1234-567890 (10 AM - 6 PM)
              </p>
            </div>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Redirecting to tour page in 10 seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}