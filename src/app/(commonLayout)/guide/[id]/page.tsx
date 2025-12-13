/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import { ArrowLeft, Mail, Phone, Calendar, Globe, ShieldCheck, Star, DollarSign, Award, RefreshCw, MapPin, BookOpen, Trophy } from "lucide-react";
import { toast } from "sonner";

interface GuideData {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePic: string;
  bio: string;
  languages: string[];
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  guide?: {
    id: string;
    expertise: string[];
    dailyRate: number;
    rating: number;
    totalTours: number;
    balance?: number;
    createdAt?: string;
    updatedAt?: string;
  } | null;
  recentTours?: Array<{
    id: string;
    title: string;
    category: string;
    durationDays: number;
    packagePrice: number;
    location: string;
    status: string;
  }>;
}

// Server action for getting guide info
async function getGuideInfo(guideId: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/user/guide/${guideId}`;
    
    //console.log(`Fetching guide info for ID: ${guideId}`);
    
    const res = await fetch(url, {
      next: { 
        revalidate: 3600 * 24, 
        tags: [`guide-${guideId}`]
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API error (${res.status}):`, errorText);
      throw new Error(`Failed to fetch guide: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.success) {
      console.error("API returned unsuccessful:", data);
      throw new Error(data.message || "Failed to fetch guide information");
    }

    //console.log("Guide data fetched successfully:", data.data?.name);
    return {
      guide: data.data || null,
      success: true,
      message: data.message || "Guide retrieved successfully"
    };
  } catch (error: any) {
    console.error("Error in getGuideInfo:", error);
    return {
      guide: null,
      success: false,
      message: error.message || "Failed to fetch guide information"
    };
  }
}

// Refresh function (force re-fetch)
async function refreshGuideData(guideId: string) {
  try {
    // Clear cache first
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/user/guide/${guideId}`;
    
    const res = await fetch(url, {
      cache: 'no-store', // Force fresh fetch
      next: { 
        revalidate: 3600 * 24 // Don't cache this request
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to refresh guide: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.message || "Failed to refresh guide information");
    }

    return {
      guide: data.data || null,
      success: true,
      message: data.message || "Guide data refreshed successfully"
    };
  } catch (error: any) {
    console.error("Error refreshing guide data:", error);
    return {
      guide: null,
      success: false,
      message: error.message || "Failed to refresh guide data"
    };
  }
}

export default function SimpleGuideProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};

  const [guide, setGuide] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuideData = useCallback(async (forceRefresh = false) => {
    if (!id) return;

    if (forceRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      let result;
      if (forceRefresh) {
        result = await refreshGuideData(id as string);
      } else {
        result = await getGuideInfo(id as string);
      }

      if (result.success && result.guide) {
        setGuide(result.guide);
        setError(null);
        if (forceRefresh) {
          toast.success("Guide data refreshed successfully");
        }
      } else {
        setGuide(null);
        setError(result.message || "Failed to load guide");
        if (!forceRefresh) {
          toast.error(result.message || "Failed to load guide profile");
        }
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      setGuide(null);
      setError(error.message || "An unexpected error occurred");
      if (!forceRefresh) {
        toast.error("Failed to load guide profile");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGuideData();
  }, [fetchGuideData]);

  const handleBack = () => router.back();
  
  const handleRefresh = () => {
    fetchGuideData(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Loading guide profile...</p>
          <p className="text-gray-400 text-sm mt-2">Guide ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center max-w-md w-full">
          <ShieldCheck className="h-20 w-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {error ? "Error Loading Profile" : "Profile Not Found"}
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 font-medium">{error || "Guide not found"}</p>
            <p className="text-sm text-red-600 mt-2">
              Guide ID: <code className="bg-red-100 px-2 py-1 rounded font-mono">{id}</code>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleBack} variant="outline" className="sm:flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={handleRefresh} variant="default" className="sm:flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isGuide = guide.role === "GUIDE";
  const hasGuideInfo = isGuide && guide.guide;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={refreshing}
                className="hidden sm:flex"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <div className="text-right">
                <h1 className="text-lg font-semibold text-gray-900">
                  {isGuide ? "Guide Profile" : "User Profile"}
                </h1>
                <p className="text-sm text-gray-500 truncate max-w-[200px]">{guide.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`h-2 ${
                guide.role === "GUIDE" ? "bg-gradient-to-r from-orange-500 to-amber-500" :
                guide.role === "ADMIN" ? "bg-gradient-to-r from-blue-500 to-indigo-500" :
                "bg-gradient-to-r from-green-500 to-emerald-500"
              }`}></div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      {guide.profilePic ? (
                        <div className="w-full h-full relative">
                          <Image
                            src={guide.profilePic}
                            alt={guide.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-400">
                            {guide.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge
                        className={
                          guide.status === "ACTIVE"
                            ? "bg-green-500 hover:bg-green-600"
                            : guide.status === "INACTIVE"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }
                      >
                        {guide.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Name and Role */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {guide.name}
                        </h2>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                          guide.role === "GUIDE" ? "bg-amber-50 text-amber-800" :
                          guide.role === "ADMIN" ? "bg-blue-50 text-blue-800" :
                          "bg-green-50 text-green-800"
                        }`}>
                          <ShieldCheck className="h-4 w-4" />
                          {guide.role}
                        </div>
                      </div>
                      <Button
                        onClick={() => window.location.href = `mailto:${guide.email}`}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                    <p className="text-gray-600">{guide.bio || "No bio provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Statistics Card */}
            {hasGuideInfo && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Guide Performance
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      <span className="text-2xl font-bold">{guide?.guide?.rating?.toFixed(1) || "0.0"}</span>
                    </div>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-blue-500" />
                      <span className="text-2xl font-bold">{guide?.guide?.totalTours || 0}</span>
                    </div>
                    <p className="text-sm text-gray-600">Total Tours</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold">{guide?.guide?.dailyRate || 0}</span>
                    </div>
                    <p className="text-sm text-gray-600">Daily Rate</p>
                  </div>
                  
                  {guide?.guide?.balance !== undefined && (
                    <div className="bg-amber-50 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <DollarSign className="h-5 w-5 text-purple-500" />
                        <span className="text-2xl font-bold">{guide?.guide?.balance}</span>
                      </div>
                      <p className="text-sm text-gray-600">Balance</p>
                    </div>
                  )}
                </div>

                {/* Expertise */}
                {guide?.guide?.expertise && guide?.guide?.expertise.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.guide.expertise.map((exp: string, index: number) => (
                          <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Recent Tours (if available) */}
            {guide.recentTours && guide.recentTours.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Recent Tours
                </h3>
                <div className="space-y-3">
                  {guide.recentTours.slice(0, 5).map((tour) => (
                    <div key={tour.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{tour.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span>{tour.location}</span>
                          <span>•</span>
                          <span>{tour.durationDays} days</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {tour.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatPrice(tour.packagePrice)}</p>
                        <Badge className={
                          tour.status === "ACTIVE" ? "bg-green-100 text-green-800" :
                          tour.status === "INACTIVE" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }>
                          {tour.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Side Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium break-all">{guide.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{guide.phone || "Not provided"}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.href = `mailto:${guide.email}`}
                  className="w-full mt-2"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>

            {/* Languages Card */}
            {guide.languages && guide.languages.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((language: string, index: number) => (
                    <Badge key={index} variant="outline" className="py-2 px-4">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Account Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{formatDate(guide.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                  <p className="font-medium">{formatDate(guide.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">User ID</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block truncate">
                    {guide.id}
                  </code>
                </div>
                {hasGuideInfo && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Guide ID</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block truncate">
                      {guide?.guide?.id}
                    </code>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to List
                </Button>
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Data is cached for 1 hour
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? <Button variant="link" className="text-orange-500 p-0 h-auto">Contact support</Button>
          </p>
        </div>
      </div>
    </div>
  );
}