"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import "leaflet/dist/leaflet.css";

// Load React-Leaflet components on client only
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const FindUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="my-32 font-serif w-[80vw] mx-auto">
      <h2
        className="text-center font-semibold text-2xl text-green-600 italic"
        data-aos="fade-up"
      >
        Find Touriciouz____
      </h2>

      <h1
        className="text-3xl font-semibold my-5 text-center"
        data-aos="fade-up"
      >
        We Create Worth Journeys!
      </h1>

      <p
        className="text-lg lg:w-[50vw] mx-auto mt-5 mb-10 text-center"
        data-aos="fade-up"
      >
        Proactively fabricate one-to-one materials via effective e-business.
        Completely synergize scalable e-commerce rather than high standards.
      </p>

      {/* MAP */}
      <div data-aos="flip-up">
        <MapContainer
          className="w-[80vw] h-[500px] mx-auto"
          center={[22.351854101271293, 91.83387696110066]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[22.351854101271293, 91.83387696110066]}>
            <Popup>Chittagong</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default FindUs;
