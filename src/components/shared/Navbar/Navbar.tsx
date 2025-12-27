"use client";

import Link from "next/link";
import Headroom from "react-headroom";
import { MdPhone } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useSession } from "next-auth/react";
import { UserProfileDropdown } from "./user-profile-dropdown";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Headroom>
      {/* Top Bar */}
      <div className="bg-slate-900/90 px-5 lg:px-24 xl:px-52 py-2 text-gray-400 flex justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <MdPhone />
            <span>+0123456789</span>
          </div>
          <div className="flex items-center gap-2">
            <IoTime />
            <span>24/7</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link href="https://www.facebook.com/" target="_blank">
            <FaFacebook className="w-5 h-5" />
          </Link>
          <Link href="https://www.twitter.com/" target="_blank">
            <FaTwitter className="w-5 h-5" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/70 text-black lg:px-16 xl:px-40 border-b border-2 flex items-center justify-between py-2">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 ml-2 lg:ml-0">
          <Logo />
          <span className="mx-2 font-bold normal-case font-serif italic">
            <span className="text-4xl text-green-700">Tour</span>
            <span className="text-2xl">iciouz</span>
          </span>
        </Link>

        {/* Desktop Navigation with NavMenu */}
        <div className="hidden lg:flex items-center gap-4">
          <NavMenu orientation="horizontal" />
          
          {/* User Profile Dropdown for Desktop */}
          {session && <UserProfileDropdown />}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <NavigationSheet />
        </div>
      </nav>
    </Headroom>
  );
};

export default Navbar;
