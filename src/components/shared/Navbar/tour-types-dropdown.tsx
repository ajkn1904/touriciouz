"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export const TourTypesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tourTypes = [
    { name: "Adventure Tours", href: "/tours/adventure", icon: "🏔️" },
    { name: "Cultural Tours", href: "/tours/cultural", icon: "🏛️" },
    { name: "Nature & Wildlife", href: "/tours/nature", icon: "🌿" },
    { name: "Luxury Travel", href: "/tours/luxury", icon: "⭐" },
    { name: "Family Packages", href: "/tours/family", icon: "👨‍👩‍👧‍👦" },
    { name: "Honeymoon Specials", href: "/tours/honeymoon", icon: "💖" },
    { name: "Group Tours", href: "/tours/group", icon: "👥" },
    { name: "Custom Itinerary", href: "/tours/custom", icon: "✏️" },
  ];

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-300">
        Tour Types
        <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-green-100 z-50 overflow-hidden animate-in slide-in-from-top-5">
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Explore Tours</h3>
            <div className="grid grid-cols-2 gap-2">
              {tourTypes.map((tour) => (
                <Link
                  key={tour.name}
                  href={tour.href}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{tour.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{tour.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/tours"
                className="block w-full text-center py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                View All Tours
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};