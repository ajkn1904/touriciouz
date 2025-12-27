"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";
import { User, UserService } from "@/src/services/user/userServiceActions";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";

export const UserProfileDropdown = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!session) return;
      
      try {
        const data = await UserService.getMe();
        setProfile(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to load profile:", err);
      }
    };
    loadProfile();
  }, [session]);

  if (!session) return null;

  const userMenu = [
    { name: "My Profile", href: "/dashboard/my-profile"}
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User profile menu"
        className="flex justify-center items-center gap-2 border rounded-full"
      >
        {/* Profile Image or Default Icon */}
        {profile?.profilePic ? (
          <div className="relative w-12 h-12  overflow-hidden">
            <Image
              src={profile.profilePic}
              alt="Profile"
              fill
              className="border border-green-500 rounded-full object-cover"

            />
          </div>
        ) : (
          <UserCircle2 className="w-10 h-10 text-green-500" />
        )}

                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-green-100 z-50 overflow-hidden animate-in slide-in-from-top-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {/* Profile Image */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500">
                {profile?.profilePic ? (
                  <Image
                    src={profile.profilePic}
                    alt={profile?.name || "User"}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                    {profile?.name?.charAt(0) || session.user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              
              <div className="min-w-0">
                <p className="font-bold text-gray-800 truncate">
                  {profile?.name || session.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {session.user?.email || "user@example.com"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {session.user?.role || "Tourist"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="p-2">
            {userMenu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-700">{item.name}</span>
              </Link>
            ))}
            
            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/login" });
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600 mt-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};