/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { UserService, User } from "@/src/services/user/userServiceActions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import Phone from "@/src/components/ui/Phone";
import SingleImageUploader from "../../SingleFileUploader";
import { toast } from "sonner";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

export enum TourCategory {
  HISTORY = "HISTORY",
  FOOD = "FOOD",
  NIGHTLIFE = "NIGHTLIFE",
  SHOPPING = "SHOPPING",
  ADVENTURE = "ADVENTURE",
  CULTURE = "CULTURE",
  ART = "ART",
  NATURE = "NATURE",
}

export default function ProfileManagement() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await UserService.getMe();
        setProfile(data);
      } catch (err: any) {
        setMessage(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found.</p>;

  const toggleExpertise = (category: TourCategory) => {
    if (!profile || !profile.guide) return;

    const currentExpertise = profile.guide.expertise || [];
    const newExpertise = currentExpertise.includes(category)
      ? currentExpertise.filter((c) => c !== category)
      : [...currentExpertise, category];

    setProfile({
      ...profile,
      guide: {
        ...profile.guide,
        expertise: newExpertise,
        dailyRate: profile.guide.dailyRate || 0,
      },
    });
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setUpdating(true);
    setMessage("");

    try {
      const payload: any = {
        name: profile.name,
        phone: profile.phone || "",
        bio: profile.bio,
        languages: profile.languages || [],
      };

      if (profile.role === "GUIDE") {
        payload.expertise = profile.guide?.expertise || [];
        payload.dailyRate = profile.guide?.dailyRate || 0;
      }

      const updated = await UserService.updateMyProfile(payload, file || undefined);
      setProfile(updated);
      toast.success("Profile updated successfully!");
      setMessage("Profile updated successfully");
      setFile(null);
    } catch (err: any) {
      setMessage(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const avatarUrl = profile.profilePic || null;

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card>
        <CardHeader className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile Avatar"
                width={80}
                height={80}
                className="w-20 h-20 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <UserIcon className="w-10 h-10 text-gray-500" />
              </div>
            )}
          </div>
          <div>
            <CardTitle>{profile.name || "User"}</CardTitle>
            <CardDescription>{profile.role} Profile</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || "-"}</p>
          <p><strong>Bio:</strong> {profile.bio || "-"}</p>
          <p><strong>Languages:</strong> {profile.languages?.join(", ") || "-"}</p>

          {profile.role === "GUIDE" && profile.guide && (
            <div className="border p-3 rounded space-y-1 bg-gray-50">
              <h4 className="font-semibold">Guide Info</h4>
              <p><strong>Daily Rate:</strong> {profile.guide.dailyRate || 0}</p>
              <p><strong>Rating:</strong> {profile.guide.rating || 0}</p>
              <p><strong>Total Tours:</strong> {profile.guide.totalTours || 0}</p>
              <p>
                <strong>Expertise:</strong>{" "}
                {profile.guide.expertise?.length
                  ? profile.guide.expertise.join(", ")
                  : "-"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Profile</CardTitle>
          <CardDescription>Modify your information below</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4">
              <AlertTitle>Message</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Profile Image */}
            <SingleImageUploader onChange={setFile} />

            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Phone
                value={profile.phone || ""}
                onChange={(val) => setProfile({ ...profile, phone: val || "" })}
              />
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>

            {/* Languages */}
            <div className="space-y-1">
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                value={profile.languages?.join(", ") || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    languages: e.target.value.split(",").map((l) => l.trim()),
                  })
                }
              />
            </div>

            {/* Guide-specific fields */}
            {profile.role === "GUIDE" && profile.guide && (
              <div className="border p-4 rounded space-y-2 bg-gray-50">
                <h4 className="font-semibold">Guide Info</h4>

                {/* Daily Rate */}
                <div className="space-y-1">
                  <Label htmlFor="dailyRate">Daily Rate</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    value={profile.guide.dailyRate || 0}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        guide: {
                          ...profile.guide,
                          dailyRate: Number(e.target.value),
                          expertise: profile?.guide?.expertise || [],
                        },
                      })
                    }
                  />
                </div>

                {/* Expertise checkboxes */}
                <div className="space-y-1">
                  <Label>Expertise</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(TourCategory).map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          checked={profile.guide?.expertise?.includes(category) || false}
                          onCheckedChange={() => toggleExpertise(category)}
                        />
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md border border-green-500 shadow-lg transition-all duration-300 hover:border-2 w-full" disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
