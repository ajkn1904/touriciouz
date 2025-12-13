"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'processing' | 'detected'>('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Check for SSLCommerz callback parameters
        const tranId = searchParams.get('tran_id');
        const valId = searchParams.get('val_id');
        const statusParam = searchParams.get('status');
        const amount = searchParams.get('amount');
        
        // console.log('Direct Callback Params:', {
        //   tranId,
        //   valId,
        //   statusParam,
        //   amount
        // });

        if (!tranId && !valId) {
          setMessage('No payment callback detected');
          setStatus('detected');
          return;
        }

        // Validate payment with backend
        if (valId) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api'}/payment/validate`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ val_id: valId }),
            }
          );

          if (response.ok) {
            const result = await response.json();
            //console.log('Payment validation result:', result);
            
            if (result.data?.status === 'VALID') {
              // Payment is valid
              toast.success('Payment validated successfully!');
              
              // Clear stored data
              localStorage.removeItem('tourBooking');
              localStorage.removeItem('paymentSession');
              
              // Redirect to success page
              setTimeout(() => {
                router.push(`/payment/success?transactionId=${tranId}&amount=${amount}&status=success`);
              }, 1000);
            } else {
              // Payment invalid
              toast.error('Payment validation failed');
              setTimeout(() => {
                router.push(`/payment/failed?transactionId=${tranId}&status=fail`);
              }, 1000);
            }
          } else {
            throw new Error('Validation request failed');
          }
        } else if (statusParam === 'success') {
          // Direct success callback
          setTimeout(() => {
            router.push(`/payment/success?transactionId=${tranId}&amount=${amount}&status=success`);
          }, 1000);
        } else {
          // Failed or cancelled
          setTimeout(() => {
            router.push(`/payment/failed?transactionId=${tranId}&status=fail`);
          }, 1000);
        }

      } catch (error) {
        console.error('Callback processing error:', error);
        setMessage('Error processing payment callback');
        setStatus('detected');
        toast.error('Unable to process payment callback');
      }
    };

    processCallback();
  }, [searchParams, router]);

  if (status === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Processing Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please wait while we verify your payment details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Payment Callback
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message || 'Processing payment callback...'}
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={() => router.push('/dashboard/tourist/my-booking')}
            className="w-full"
          >
            Check My Bookings
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
    </div>
  );
}