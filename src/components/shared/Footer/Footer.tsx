"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
  "https://images.unsplash.com/photo-1612278675615-7b093b07772d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
  "https://images.unsplash.com/photo-1682687981922-7b55dbb30892?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
];

const Footer = () => {
  return (
    <div className="font-serif">

      {/* Main Footer */}
      <footer className="flex flex-col md:flex-row justify-between  p-10 bg-slate-900 text-white gap-8 lg:gap-32">
        {/* Quick Links */}
        <div className="flex-1 footer sm:flex flex-wrap justify-between md:gap-16">
          <div className="flex flex-col">
            <span className="text-gray-500 font-bold text-lg uppercase mt-10 mb-3 md:mt-0 md:mb-2 ">Quick Links</span>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Destination</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Packages</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Tours</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Blog</a>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-bold text-lg uppercase mt-10 mb-3 md:mt-0 md:mb-2 ">Company</span>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">About us</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Contact</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Jobs</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Press kit</a>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-bold text-lg uppercase mt-10 mb-3 md:mt-0 md:mb-2 ">Legal</span>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Terms of use</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Privacy policy</a>
            <a className="link link-hover hover:text-green-400 text-sm text-gray-200 my-1">Cookie policy</a>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 sm:m-auto md:my-0 w-full lg:max-w-96">
          <h1 className="text-gray-500 font-bold text-lg uppercase mt-10 mb-10 md:mt-0 md:mb-5 ">Gallery Showcase</h1>
          <PhotoProvider>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((src, idx) => (
                <PhotoView key={idx} src={src}>
                  <Image
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    width={120}
                    height={80}
                    className="w-[120px] h-20 rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700 cursor-pointer"
                  />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </div>
      </footer>

      {/* Bottom Footer */}
      <footer className="footer px-10 py-4 bg-slate-800 text-green-100 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-4">
          <Image
            width={96}
            height={96}
            src="https://i.ibb.co/C1Lqqpz/logo-2.png"
            alt="logo"
            className="w-24 h-24 rounded-full border-l-2"
          />
          <small>
            TOURICIOUZ <br />
            © 2023 - All rights reserved by Anika Jumana Khanam
          </small>
        </div>

        <div className="grid grid-flow-col gap-4">
          <Link href="https://www.facebook.com/" target="_blank">
            <FaFacebook className="w-8 h-8" />
          </Link>
          <Link href="https://www.twitter.com/" target="_blank">
            <FaTwitter className="w-8 h-8" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="w-8 h-8" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
