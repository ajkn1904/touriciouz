import { Suspense } from "react";
import PaymentFailedClient from "./PaymentFailedClient";

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentFailedClient />
    </Suspense>
  );
}
