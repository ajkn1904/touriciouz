"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X, DollarSign, SlidersHorizontal } from "lucide-react";

interface TourSearchFilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
  categories?: string[];
  showAdvancedFilters?: boolean;
}

const TourSearchFilter = ({ 
  onFilterChange,
  categories = ["HISTORY", "FOOD", "NIGHTLIFE", "SHOPPING", "ADVENTURE", "CULTURE", "ART", "NATURE"],
  showAdvancedFilters = true
}: TourSearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("-createdAt");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update price range when min/max change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSearch = () => {
    const filters: Record<string, any> = {};
    
    if (searchTerm.trim()) {
      filters.search = searchTerm.trim();
    }
    
    if (selectedCategory) {
      filters.category = selectedCategory;
    }
    
    if (selectedSort) {
      filters.sort = selectedSort;
    }
    
    // Price range handling
    if (minPrice > 0 || maxPrice < 10000) {
      filters.minPrice = minPrice;
      filters.maxPrice = maxPrice;
    }
    
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSort("-createdAt");
    setMinPrice(0);
    setMaxPrice(10000);
    setPriceRange([0, 10000]);
    onFilterChange({});
  };

  // Auto-search when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSort, minPrice, maxPrice]);

  return (
    <div className="mb-8">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tours by title, location, or description..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          
          {showAdvancedFilters && (
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          )}
          
          <button
            onClick={handleClearFilters}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Advanced Filters Section */}
      {showAdvancedFilters && (
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block bg-white rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${minPrice} - ${maxPrice}
              </label>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    step="100"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Min price"
                  />
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Max price"
                  />
                </div>
                
                <div className="relative pt-6">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-2 bg-blue-600 rounded-full"
                      style={{
                        left: `${(minPrice / 10000) * 100}%`,
                        right: `${100 - (maxPrice / 10000) * 100}%`
                      }}
                    ></div>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={minPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value <= maxPrice) setMinPrice(value);
                    }}
                    className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= minPrice) setMaxPrice(value);
                    }}
                    className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="packagePrice">Price: Low to High</option>
                <option value="-packagePrice">Price: High to Low</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourSearchFilter;