"use client";

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [bookingId, setBookingId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double execution
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processPaymentSuccess = async () => {
      try {
        // Get parameters from URL
        const transactionIdParam = searchParams.get('transactionId');
        const amountParam = searchParams.get('amount');
        const status = searchParams.get('status');
        
        // console.log('Payment Success Params:', {
        //   transactionId: transactionIdParam,
        //   amount: amountParam,
        //   status
        // });

        // Get booking info from localStorage
        const storedBooking = localStorage.getItem('pendingBooking');
        
        if (storedBooking) {
          try {
            const bookingData = JSON.parse(storedBooking);
            // Use setTimeout to avoid synchronous setState in effect
            setTimeout(() => {
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

        if (amountParam) {
          setTimeout(() => {
            setAmount(amountParam);
          }, 0);
        }

        if (status === 'success') {
          toast.success('Payment successful! Booking confirmed.');
          
          // Clear all stored data after a delay
          setTimeout(() => {
            localStorage.removeItem('pendingBooking');
            localStorage.removeItem('paymentSession');
          }, 1000);
          
          // Auto-redirect after 5 seconds
          const redirectTimer = setTimeout(() => {
            setIsProcessing(false);
            router.push('/dashboard/tourist/my-booking');
          }, 5000);

          return () => clearTimeout(redirectTimer);
        }
      } catch (error) {
        console.error('Payment success processing error:', error);
        setIsProcessing(false);
      }
    };

    processPaymentSuccess();
    
    // Cleanup function
    return () => {
      hasProcessed.current = true;
    };
  }, [searchParams, router]);

  const handleGoToBookings = () => {
    setIsProcessing(false);
    router.push('/dashboard/tourist/my-booking');
  };

  const handleViewReceipt = () => {
    toast.info('Receipt will be available in your bookings page');
  };

  // Show loading state
  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Processing Payment...</h1>
            <p className="text-green-100">Please wait while we confirm your payment</p>
          </div>
          
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Verifying your payment details and confirming your booking...
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful! 🎉</h1>
          <p className="text-green-100">Your booking has been confirmed</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Transaction Details */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Transaction Details
            </h2>
            <div className="space-y-2">
              {transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Transaction ID:</span>
                  <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                    {transactionId}
                  </span>
                </div>
              )}
              
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount Paid:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              )}
              
              {bookingId && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Booking ID:</span>
                  <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                    {bookingId}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Status:</span>
                <span className="font-bold text-green-600 dark:text-green-400">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              What`&apos;`s Next?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-300">1</span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  You will receive a confirmation email with booking details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-300">2</span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  Your guide will contact you within 24 hours
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-300">3</span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  Check your bookings page for updates and itinerary
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleGoToBookings}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              View My Bookings
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleViewReceipt}
                className="w-full"
              >
                Download Receipt
              </Button>
              
              <Button
                variant="outline"
                asChild
              >
                <Link href="/tours">
                  Browse More Tours
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@tourapp.com" className="text-green-600 hover:underline">
                support@tourapp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}