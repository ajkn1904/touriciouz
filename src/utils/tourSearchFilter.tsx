/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import TourSearchFilterClient from "./TourSearchFilterWrapper";

export default function TourSearchFilterWrapper(props: any) {
  return (
    <Suspense fallback={null}>
      <TourSearchFilterClient {...props} />
    </Suspense>
  );
}
