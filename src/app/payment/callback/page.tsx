import { Suspense } from "react";
import PaymentCallbackClient from "./PaymentCallbackClient";

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Processing payment...</div>}>
      <PaymentCallbackClient />
    </Suspense>
  );
}
