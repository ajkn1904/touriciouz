"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { 
  HiOutlineMenu, 
  HiOutlineUserCircle,
  HiOutlineHome,
  HiOutlineGlobe,
  HiOutlineMap,
  HiOutlineInformationCircle,
  HiOutlinePhone
} from "react-icons/hi";
import { FaSignOutAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Logo } from "./logo";

export const MobileNavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: "/", label: "Home", icon: <HiOutlineHome className="w-5 h-5" /> },
    { href: "/tour", label: "Tours", icon: <HiOutlineGlobe className="w-5 h-5" /> },
    { href: "/destinations", label: "Destinations", icon: <HiOutlineMap className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <HiOutlineInformationCircle className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <HiOutlinePhone className="w-5 h-5" /> },
  ];

  const socialIcons = [
    { icon: <FaFacebook className="w-5 h-5" />, href: "#" },
    { icon: <FaTwitter className="w-5 h-5" />, href: "#" },
    { icon: <FaInstagram className="w-5 h-5" />, href: "#" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "#" },
    { icon: <FaYoutube className="w-5 h-5" />, href: "#" },
  ];

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
      >
        <HiOutlineMenu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Logo />
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">
                      <span className="text-green-600">Tour</span>
                      <span className="text-emerald-600">iciouz</span>
                    </h1>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-green-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              {/* Auth Section */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                {session ? (
                  <>
                    <Link
                      href="/dashboard/my-profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <HiOutlineUserCircle className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiOutlineUserCircle className="w-5 h-5" />
                    Login / Register
                  </Link>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3 text-center">Follow us</p>
              <div className="flex justify-center gap-3">
                {socialIcons.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                © {new Date().getFullYear()} Touriciouz. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};