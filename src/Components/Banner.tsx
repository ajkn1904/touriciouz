import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";



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
            <img className="h-[500px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className="h-[500px]  md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className="h-[500px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt=""/>
        </SwiperSlide>
        <SwiperSlide>
            <img className="h-[500px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1562583078-9a9e329f2185?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
        </SwiperSlide>
        <SwiperSlide>
            <img className="h-[500px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1518317507427-5346735246ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt=""/>
        </SwiperSlide>
        
        
        
      </Swiper>
    </>
    );
};

export default Banner;