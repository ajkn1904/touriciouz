"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "../../../styles/Banner.module.css";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
};

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* SLIDE 1 */}
        <SwiperSlide className="relative">
          <div className={styles.bannerImg}>
            <Image
              width={1920}
              height={680}
              className="h-[550px] md:h-[600px] lg:h-[680px] w-full"
              src="https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?auto=format&fit=crop&w=2071&q=80"
              alt=""
            />
          </div>

          <div className="absolute top-1 left-[8%]">

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]">
                Find Your Special Tour Today
              </h1>

              <br />

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-40 sm:top-[200px] md:top-60 lg:top-[210px] w-[80vw]">
                With{" "}
                <span className="text-green-700 bg-white p-2 font-bold">
                  Tour<span className="text-black">iciouz</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.9 }}
              className="absolute text-md sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] 
              top-[250px] sm:top-[310px] md:top-[360px] 
              bg-linear-to-r from-white bg-opacity-70 p-4"
            >
              Awesome Hotel & Ticket & also Tour With Best Experience.
            </motion.p>

            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 1 }}
              className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px] 
              hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center"
            >
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              </span>
              <p className="absolute">Explore Tour</p>
            </motion.button>

          </div>
        </SwiperSlide>

        {/* You can duplicate and replace content for other slides */}
      </Swiper>
    </>
  );
};

export default Banner;
