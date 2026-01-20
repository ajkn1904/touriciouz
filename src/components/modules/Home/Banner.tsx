"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../../../styles/Banner.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const textVariants = {
  right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  bottom: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
};

const slides = [
  {
    title1: "Find Your Special Tour Today",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    desc: "Discover curated adventures tailored to your interests. From mountain treks to cultural immersions, find the perfect tour and seamless booking.",
  },
  {
    title1: "Start Your Tour",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    desc: "Begin your journey with confidence. We handle all details—accommodations, transportation, and guided experiences to create your unforgettable memories.",
  },
  {
    title1: "For The Best Deal Travel",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    desc: "Get exceptional value with our transparent pricing. Enjoy premium experiences at competitive rates, with no hidden fees and flexible booking options.",
  },
  {
    title1: "Gether You Best Experience",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1562583078-9a9e329f2185?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    desc: "Collect moments that last a lifetime. Our expert guides ensure immersive experiences, authentic interactions, and stories worth sharing for years to come.",
  },
  {
    title1: "Make Your Holiday Memorable",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1518317507427-5346735246ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    desc: "Transform ordinary vacations into extraordinary adventures. We specialize in creating personalized tours that exceed expectations and deliver joy at every turn.",
  },
];

const Banner = () => {
  return (
    <div className="h-[70vh] w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true, type: "progressbar" }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full !z-0 !relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <div className={`${styles.bannerImg} h-full w-full`}>
              <Image
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
                src={slide.img}
                alt={slide.title1}
                priority={index === 0}
              />
            </div>

            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute -top-7 md:top-0 left-0 h-full w-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
              <div className="max-w-7xl w-[95%] mx-auto">
                <motion.h1
                  initial={textVariants.right.initial}
                  animate={textVariants.right.animate}
                  transition={{ duration: 1 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-serif text-white md:mb-2"
                >
                  {slide.title1}
                </motion.h1>

                <motion.h1
                  initial={textVariants.right.initial}
                  animate={textVariants.right.animate}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-6 md:mb-8"
                >
                  With{" "}
                  <span className="text-green-700 bg-white px-4 py-2 font-bold inline-block">
                    Tour<span className="text-black">iciouz</span>
                  </span>
                </motion.h1>

                <motion.div initial={textVariants.bottom.initial}
                    animate={textVariants.bottom.animate}
                    transition={{ duration: 1, delay: 0.5 }}>
                  <p        
                    className="text-white sm:text-lg max-w-xl lg:max-w-2xl mb-8 md:mb-10 bg-gradient-to-r from-black/30 to-transparent p-4 rounded-lg"
                  >
                    {slide.desc}
                  </p>

                  <button
                    className="relative w-48 flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 text-white font-semibold rounded-lg border-2 border-gray-500 shadow-2xl shadow-blue-700 hover:border-yellow-500 hover:bg-gray-900 transition-all duration-300 group"
                  >
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400/75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-500"></span>
                    </span>
                    <Link href={"/tour"} className="text-lg">Explore Tour</Link>
                  </button>
                </motion.div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;