"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function FreeMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: "https://tiles.stadiamaps.com/styles/osm_bright.json",
      center: [91.83387696110066, 22.351854101271293], 
      zoom: 10,
    });

    new maplibregl.Marker()
      .setLngLat([91.83387696110066, 22.351854101271293])
      .setPopup(new maplibregl.Popup().setText("Chittagong"))
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-[80vw] h-[500px] mx-auto rounded-xl overflow-hidden"
    />
  );
}
