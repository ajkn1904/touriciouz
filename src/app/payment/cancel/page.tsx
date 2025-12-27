import { Suspense } from "react";
import PaymentCanceledClient from "./PaymentCanceledClient";


export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentCanceledClient />
    </Suspense>
  );
}
