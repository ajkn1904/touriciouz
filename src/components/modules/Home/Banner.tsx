"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../../../styles/Banner.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const textVariants = {
  right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  bottom: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
};

const slides = [
  {
    title1: "Find Your Special Tour Today",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    desc: "Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.",
  },
  {
    title1: "Start Your Tour",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    desc: "Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.",
  },
  {
    title1: "For The Best Deal Travel",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    desc: "Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.",
  },
  {
    title1: "Gether You Best Experience",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1562583078-9a9e329f2185?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    desc: "Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.",
  },
  {
    title1: "Make Your Holiday Memorable",
    title2: "With Touriciouz",
    img: "https://images.unsplash.com/photo-1518317507427-5346735246ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    desc: "Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.",
  },
];

const Banner = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true, type: "progressbar" }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <div className={styles.bannerImg}>
            <Image
              width={1920}
              height={680}
              className="h-[550px] md:h-[600px] lg:h-[680px] w-full"
              src={slide.img}
              alt=""
            />
          </div>

          <div className="absolute top-1 left-[8%]">
            <motion.h1
              initial={textVariants.right.initial}
              animate={textVariants.right.animate}
              transition={{ duration: 1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]"
            >
              {slide.title1}
            </motion.h1>

            <motion.h1
              initial={textVariants.right.initial}
              animate={textVariants.right.animate}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-40 sm:top-[200px] md:top-60 lg:top-[210px] w-[80vw]"
            >
              With{" "}
              <span className="text-green-700 bg-white p-2 font-bold">
                Tour<span className="text-black">iciouz</span>
              </span>
            </motion.h1>

            <motion.p
              initial={textVariants.bottom.initial}
              animate={textVariants.bottom.animate}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute text-md sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-linear-to-r from-white/70 p-4"
            >
              {slide.desc}
            </motion.p>

            <motion.button
              initial={textVariants.bottom.initial}
              animate={textVariants.bottom.animate}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute top-[380px] sm:top-[440px] md:top-[480px] w-36 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg border-2 border-gray-500 shadow-2xl shadow-blue-700 hover:border-yellow-500 transition-all duration-300"
            >

              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              </span>
              <p className="absolute">Explore Tour</p>
            </motion.button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
