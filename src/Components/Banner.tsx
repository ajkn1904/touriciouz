import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import styles from "../styles/Banner.module.css"


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
        <SwiperSlide>
          <div className={styles.bannerImg}>
            <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" alt="" />
          </div>
          
          <div className="absolute top-1 left-[8%]">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif absolute top-[100px] w-[80vw]">Start Your Tour</h1>
            <br />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif absolute top-[160px] sm:top-[200px] md:top-[210px] w-[80vw]">With <span className="text-green-700 bg-white p-2 font-bold"> Tour<span className="text-black">iciouz</span></span>  </h1>
                   
            <p className="absolute text-md  sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-gradient-to-r from-white bg-opacity-70 p-4">
              Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.
            </p>
                       
            <button className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px]">Explore Tour</button>
          </div>
        </SwiperSlide>




        <SwiperSlide>
          <img className="h-[550px]  md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1562583078-9a9e329f2185?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1518317507427-5346735246ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
        </SwiperSlide>



      </Swiper>
    </>
  );
};

export default Banner;