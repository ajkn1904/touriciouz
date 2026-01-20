"use client"
/* eslint-disable @typescript-eslint/no-require-imports */

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'aos/dist/aos.css';
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";



const TourType = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);


    return (
        <div className="max-w-7xl w-[95%] mx-auto font-serif mt-40 text-center" data-aos="zoom-in" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="true">
            <h3 className="text-2xl font-semibold my-4 text-green-600 italic">Your Kind Of Holiday__</h3>
            <h1 className="text-3xl font-semibold my-5">Your world, your way</h1>
            <p className="text-lg w-[60vw] mx-auto">
                Discover tours tailored to your travel style. Whether you seek adrenaline-fueled adventures,
                cultural immersions, or relaxing getaways, we offer diverse experiences led by expert local guides.
                Find your perfect journey with our curated categories.
            </p>
            <hr className="w-[80vw] mt-10 mx-auto border border-green-600" />



            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper mx-auto mt-20 mb-12 text-center h-[250px]"
                data-aos="zoom-in" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="true"
            >
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/ck79Lz6/864267.png" alt="" />
                    <p className="text-xs my-4">ONE WITH NATURE</p>
                    <h1 className="text-xl font-semibold">ADVENTURE</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/McDdSbL/7896904.png" alt="" />
                    <p className="text-xs my-4">SKIING AND SNOW</p>
                    <h1 className="text-xl font-semibold">NATURE</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/9WnFRPc/3942054.png" alt="" />
                    <p className="text-xs my-4">EXCITING BALLOON</p>
                    <h1 className="text-xl font-semibold">NIGHTLIFE</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/1M4jFdj/6496233.png" alt="" />
                    <p className="text-xs my-4">VISIT THE WORLDS</p>
                    <h1 className="text-xl font-semibold">CULTURE</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/PwBFMc4/10364154.png" alt="" />
                    <p className="text-xs my-4">EXPERIENCE HISTORY</p>
                    <h1 className="text-xl font-semibold">PYRAMIDS</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/J38GXmc/10212726.png" alt="" />
                    <p className="text-xs my-4">GO AND TRAVEL</p>
                    <h1 className="text-xl font-semibold">FOOD To SHOPPING</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={100} height={100} className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/GcyJnTM/1861292.png" alt="" />
                    <p className="text-xs my-4">GREAT HISTORIC</p>
                    <h1 className="text-xl font-semibold">HISTORY</h1>
                </SwiperSlide>

            </Swiper>


            <Link href={"/tour"} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md border border-green-500 shadow-2xl shadow-blue-700 transition-all duration-300 hover:border-2 hover:border-yellow-500" data-aos="fade-down" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="true">Find the Perfect Tour</Link>
        </div>
    );
};

export default TourType;