/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import Image from "next/image";
import GetPagination from "@/src/utils/GetPagination";
import { useRouter, useSearchParams } from "next/navigation"; // Add useSearchParams
import { getAllTours } from "@/src/services/tour/getAllTours";
import { 
  MapPin, 
  DollarSign, 
  Star, 
  Users,
  Clock,
  ArrowRight,
  Filter,
  Search,
  X
} from "lucide-react";
import SkeletonLoader from "@/src/utils/SkeletonLoader";

interface Tour {
  id: string;
  title: string;
  description: string;
  itinerary: string | null;
  category: string;
  packagePrice: number;
  durationDays: number;
  images: string[];
  createdAt: string;
  location?: string;
  rating?: number;
  maxGroupSize?: number;
  physicality?: string;
}

// Skeleton Loader Component
const TourCardSkeleton = () => (
  <SkeletonLoader/>
);

// Tour Card Component (unchanged)
const TourCard = ({ tour }: { tour: Tour }) => {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-[400px] cursor-pointer group border border-gray-200"
      onClick={() => router.push(`/tour/${tour.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tour.images?.[0] || "/placeholder.png"}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-800">
            {tour.category?.charAt(0) + tour.category?.slice(1).toLowerCase()}
          </span>
        </div>
        {/* Rating Badge - Only show if rating exists and > 0 */}
        {tour.rating && tour.rating > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-white">{tour.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {tour.title}
        </h3>
        
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {tour.description}
        </p>
                {/* Meta Info - Top Row */}
        <div className="flex items-center gap-4 mb-3">
          {tour.location ? (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-green-500" />
              <span className="truncate max-w-[120px]">{tour.location}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="truncate max-w-[120px]">Location not specified</span>
            </div>
          )}
        </div>
        {/* Meta Info - Bottom Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{tour.durationDays} days</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="font-semibold">${tour.packagePrice.toFixed(2)}</span>
          </div>
          {tour.maxGroupSize && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-orange-500" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
          )}
          {tour.physicality ? (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">{tour.physicality}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-gray-600">Not specified</span>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <button 
          className="mt-auto w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:from-green-700 hover:to-green-900 transition-all transform hover:scale-[1.02] group/btn"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/tour/${tour.id}`);
          }}
        >
          Explore Tour
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Price Range Slider Component (unchanged)
const PriceRangeSlider = ({ 
  minPrice, 
  maxPrice, 
  onChange 
}: { 
  minPrice: number; 
  maxPrice: number; 
  onChange: (min: number, max: number) => void 
}) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
  }, [minPrice]);
  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  const handleMinChange = (value: number) => {
    if (value <= localMax) {
      setLocalMin(value);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value >= localMin) {
      setLocalMax(value);
    }
  };

  const handleChangeComplete = () => {
    onChange(localMin, localMax);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">${localMin}</span>
        <span className="text-sm font-medium text-gray-600">${localMax}</span>
      </div>
      
      <div className="relative pt-1">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute h-2 bg-green-600 rounded-full"
            style={{
              left: `${(localMin / 10000) * 100}%`,
              right: `${100 - (localMax / 10000) * 100}%`
            }}
          ></div>
        </div>
        
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          onMouseUp={handleChangeComplete}
          onTouchEnd={handleChangeComplete}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
        />
        
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={localMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          onMouseUp={handleChangeComplete}
          onTouchEnd={handleChangeComplete}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
        />
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Min Price</label>
          <input
            type="number"
            min="0"
            max="10000"
            step="100"
            value={localMin}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            onBlur={handleChangeComplete}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Max Price</label>
          <input
            type="number"
            min="0"
            max="10000"
            step="100"
            value={localMax}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            onBlur={handleChangeComplete}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default function ToursPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get URL search params

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);
  
  // Store all tours
  const [allTours, setAllTours] = useState<Tour[]>([]);
  
  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || "",
    category: searchParams.get('category') || "",
    sort: searchParams.get('sort') || "-createdAt",
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 10000
  });
  
  const toursPerPage = 10;
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || "");

  // Function to update URL params
  const updateUrlParams = (newFilters: typeof filters, page: number) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.sort && newFilters.sort !== "-createdAt") params.set('sort', newFilters.sort);
    if (newFilters.minPrice > 0) params.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice < 10000) params.set('maxPrice', newFilters.maxPrice.toString());
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString();
    const newUrl = queryString ? `/tour?${queryString}` : '/tour';
    
    router.push(newUrl, { scroll: false });
  };

  // Fetch all tours once
  const fetchAllTours = useCallback(async () => {
    setLoading(true);
    try {
      const { tours: fetchedTours } = await getAllTours({
        page: 1,
        limit: 1000, 
      });

      setAllTours(fetchedTours);
      
      // Apply filters immediately
      applyFilters(fetchedTours);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch tours");
      toast.error(err.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters to tours
  const applyFilters = useCallback((toursToFilter: Tour[]) => {
    let filteredTours = [...toursToFilter];

    // Apply search filter
    if (filters.search) {
      filteredTours = filteredTours.filter((tour: Tour) =>
        tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (tour.description && tour.description.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredTours = filteredTours.filter(
        (tour: Tour) => tour.category === filters.category
      );
    }

    // Apply price filter
    filteredTours = filteredTours.filter((tour: Tour) => {
      const price = tour.packagePrice;
      const min = filters.minPrice;
      const max = filters.maxPrice;
      return price >= min && price <= max;
    });

    // Apply sorting
    if (filters.sort) {
      if (filters.sort === "-createdAt") {
        filteredTours.sort(
          (a: Tour, b: Tour) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (filters.sort === "createdAt") {
        filteredTours.sort(
          (a: Tour, b: Tour) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (filters.sort === "packagePrice") {
        filteredTours.sort((a: Tour, b: Tour) => a.packagePrice - b.packagePrice);
      } else if (filters.sort === "-packagePrice") {
        filteredTours.sort((a: Tour, b: Tour) => b.packagePrice - a.packagePrice);
      } else if (filters.sort === "title") {
        filteredTours.sort((a: Tour, b: Tour) => a.title.localeCompare(b.title));
      }
    }

    // Calculate pagination
    const start = (currentPage - 1) * toursPerPage;
    const paginatedTours = filteredTours.slice(start, start + toursPerPage);

    setTours(paginatedTours);
    setTotalTours(filteredTours.length);
    setTotalPages(Math.ceil(filteredTours.length / toursPerPage));
  }, [filters, currentPage]);

  // Handle search with debounce AND update URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const newFilters = {
        ...filters,
        search: searchInput
      };
      setFilters(newFilters);
      setCurrentPage(1);
      updateUrlParams(newFilters, 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Initial load - also handle URL params
  useEffect(() => {
    // Set current page from URL
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);
    
    // Fetch tours
    fetchAllTours();
  }, []);

  // Apply filters when filters or page changes
  useEffect(() => {
    if (allTours.length > 0) {
      applyFilters(allTours);
    }
  }, [filters, currentPage, allTours, applyFilters]);

  // Handle filter changes with URL updates
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    setCurrentPage(1);
    updateUrlParams(newFilters, 1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newFilters = {
      ...filters,
      minPrice: min,
      maxPrice: max
    };
    setFilters(newFilters);
    setCurrentPage(1);
    updateUrlParams(newFilters, 1);
  };

  const clearAllFilters = () => {
    const newFilters = {
      search: "",
      category: "",
      sort: "-createdAt",
      minPrice: 0,
      maxPrice: 10000
    };
    setFilters(newFilters);
    setSearchInput("");
    setCurrentPage(1);
    updateUrlParams(newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(filters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ["HISTORY", "FOOD", "NIGHTLIFE", "SHOPPING", "ADVENTURE", "CULTURE", "ART", "NATURE"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Tours</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Explore unforgettable experiences with expert guides around the world
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Flex Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Filters (Desktop) */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Filter className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                </div>
                
                {/* Search in Sidebar */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Search Tours
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="search"
                      placeholder="Search tours..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0) + cat.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price Range
                  </label>
                  <PriceRangeSlider
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onChange={handlePriceRangeChange}
                  />
                </div>

                {/* Sort Options */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Sort By
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                  >
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                    <option value="packagePrice">Price: Low to High</option>
                    <option value="-packagePrice">Price: High to Low</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={clearAllFilters}
                  className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-3/4">
            {/* Mobile Search Bar */}
            <div className="lg:hidden mb-6 bg-white rounded-xl shadow-lg p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tours..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => {
                  const mobileFilters = document.getElementById('mobile-filters');
                  if (mobileFilters) {
                    mobileFilters.classList.toggle('hidden');
                  }
                }}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Show Filters
              </button>
              
              {/* Mobile Filters */}
              <div id="mobile-filters" className="hidden mt-6">
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg"
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0) + cat.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Range
                    </label>
                    <PriceRangeSlider
                      minPrice={filters.minPrice}
                      maxPrice={filters.maxPrice}
                      onChange={handlePriceRangeChange}
                    />
                  </div>
                  
                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                    <select
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg"
                      value={filters.sort}
                      onChange={(e) => handleFilterChange("sort", e.target.value)}
                    >
                      <option value="-createdAt">Newest First</option>
                      <option value="createdAt">Oldest First</option>
                      <option value="packagePrice">Price: Low to High</option>
                      <option value="-packagePrice">Price: High to Low</option>
                      <option value="title">Title A-Z</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={clearAllFilters}
                    className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Available Tours</h2>
                {filters.search && (
                  <p className="text-gray-600 mt-1">
                    Results for: <span className="font-medium text-green-600">&quot;{filters.search}&quot;</span>
                  </p>
                )}
              </div>
              <div className="text-gray-600">
                Showing <span className="font-semibold">{((currentPage - 1) * toursPerPage) + 1}</span> -{" "}
                <span className="font-semibold">
                  {Math.min(currentPage * toursPerPage, totalTours)}
                </span> of <span className="font-semibold">{totalTours}</span> tours
              </div>
            </div>

            {/* Active Filters */}
            {(filters.search || filters.category || filters.minPrice > 0 || filters.maxPrice < 10000) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Search: {filters.search}
                    <button
                      onClick={() => handleFilterChange("search", "")}
                      className="ml-2 hover:text-green-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange("category", "")}
                      className="ml-2 hover:text-green-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Price: ${filters.minPrice} - ${filters.maxPrice}
                    <button
                      onClick={() => {
                        handleFilterChange("minPrice", 0);
                        handleFilterChange("maxPrice", 10000);
                      }}
                      className="ml-2 hover:text-green-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Tours Grid */}
            <div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <TourCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Tours</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
                  <button
                    onClick={fetchAllTours}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : tours.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No Tours Found</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    {filters.search || filters.category || filters.minPrice > 0 || filters.maxPrice < 10000
                      ? "We couldn't find any tours matching your search criteria. Try adjusting your filters."
                      : "No tours available at the moment. Please check back later."}
                  </p>
                  {(filters.search || filters.category || filters.minPrice > 0 || filters.maxPrice < 10000) && (
                    <button
                      onClick={clearAllFilters}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Tours Grid - 3 cards per row on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>

                  {/* Pagination - Updated to use handlePageChange */}
                  {totalPages > 1 && (
                    <div className="mt-12">
                      <GetPagination
                        totalItems={totalTours}
                        currentPage={currentPage}
                        setCurrentPage={handlePageChange} // Changed to handlePageChange
                        itemsPerPage={toursPerPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}