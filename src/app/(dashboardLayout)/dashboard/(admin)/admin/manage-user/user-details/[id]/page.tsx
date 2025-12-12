/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UserService, User } from "@/src/services/user/userServiceActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";


export default function UserDetails() {
    const params = useParams(); // Get user ID from route
    const id = params.id as string; // Extract ID from params
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const handleBack = () => window.history.back();

    useEffect(() => {
        const loadUser = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const fetchedUser = await UserService.getUserById(id);
                setUser(fetchedUser);
            } catch (err: any) {
                toast.error(err.message || "Failed to load user details");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id]); // Add id to dependency array

    if (loading) return "Loading...";

    if (!user) return <p className="text-center text-red-500 mt-10">User not found.</p>;

    return (
        <div className="w-full max-w-lg mx-auto p-5">
            <Card className="border border-muted">
                <CardHeader className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                        {user.profilePic ? (
                            <AvatarImage src={user.profilePic} alt={user.name} />
                        ) : (
                            <AvatarFallback className="border-2"><UserIcon /></AvatarFallback>
                        )}
                    </Avatar>
                    <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-muted-foreground">{user.phone || "-"}</p>
                </CardHeader>
                <CardContent className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Role</p>
                            <p className="capitalize">{user.role.toLowerCase()}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "ACTIVE" ? "bg-green-100 text-green-800" :
                                    user.status === "INACTIVE" ? "bg-orange-100 text-orange-800" :
                                        "bg-red-100 text-red-800"
                                }`}>
                                {user.status}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">Bio</p>
                            <p className="text-gray-600">{user.bio || "-"}</p>
                        </div>
                        {user.languages && user.languages.length > 0 && (
                            <div className="col-span-2">
                                <p className="font-semibold">Languages</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {user.languages.map((lang, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {user.role === "GUIDE" && user.guide && (
                            <>
                                <div className="col-span-2">
                                    <p className="font-semibold">Expertise</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {user.guide.expertise.map((exp, index) => (
                                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                                {exp}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">Daily Rate</p>
                                    <p className="font-bold text-lg">${user.guide.dailyRate.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Rating</p>
                                    <div className="flex items-center">
                                        <span className="font-bold text-lg mr-2">{user.guide.rating || "N/A"}</span>
                                        {user.guide.rating && (
                                            <span className="text-yellow-500">★</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">Total Tours</p>
                                    <p className="font-bold text-lg">{user.guide.totalTours || 0}</p>
                                </div>
                            </>
                        )}
                        <div>
                            <p className="font-semibold">Created At</p>
                            <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Updated At</p>
                            <p className="text-sm text-gray-600">{new Date(user.updatedAt).toLocaleDateString()} {new Date(user.updatedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </CardContent>
                <Button
                className="btn m-4 bg-green-600 text-white border-green-500 border-2 hover:border-yellow-500 shadow-lg"
                onClick={handleBack}
            >
                Back
            </Button>
            </Card>
            
        </div>
    );
}