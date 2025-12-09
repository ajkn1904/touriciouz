"use client"
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Navigation, Pagination } from "swiper/modules";



const TourType = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="w-[85vw] mx-auto font-serif mt-40 text-center" data-aos="zoom-in" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
            <h3 className="text-2xl font-semibold my-4 text-green-600 italic">Your Kind Of Holiday__</h3>
            <h1 className="text-3xl font-semibold my-5">Your world, your way</h1>
            <p className="text-lg w-[60vw] mx-auto">Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology after plug-and-play networks.</p>
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
                className="mySwiper w-[80vw] lg:w-[60vw] mx-auto mt-20 mb-12 text-center h-[250px]"
                data-aos="fade-down-right" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false"
            >
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/ck79Lz6/864267.png" alt="" />
                    <p className="text-xs my-4">ONE WITH NATURE</p>
                    <h1 className="text-xl font-semibold">Hiking</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/9WnFRPc/3942054.png" alt="" />
                    <p className="text-xs my-4">EXCITING BALLOON</p>
                    <h1 className="text-xl font-semibold">Flying</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/1M4jFdj/6496233.png" alt="" />
                    <p className="text-xs my-4">VISIT THE WORLDS</p>
                    <h1 className="text-xl font-semibold">Wonders</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/McDdSbL/7896904.png" alt="" />
                    <p className="text-xs my-4">SKIING AND SNOW</p>
                    <h1 className="text-xl font-semibold">Mountains</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/GcyJnTM/1861292.png" alt="" />
                    <p className="text-xs my-4">GREAT HISTORIC</p>
                    <h1 className="text-xl font-semibold">Monuments</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/J38GXmc/10212726.png" alt="" />
                    <p className="text-xs my-4">GO AND TRAVEL</p>
                    <h1 className="text-xl font-semibold">Faraway</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="mx-auto h-[100px] w-[100px]" src="https://i.ibb.co/PwBFMc4/10364154.png" alt="" />
                    <p className="text-xs my-4">EXPERIENCE HISTORY</p>
                    <h1 className="text-xl font-semibold">Pyramids</h1>
                </SwiperSlide>

            </Swiper>


            <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-2xl shadow-blue-700" data-aos="fade-down" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">Find the Perfect Tour</button>
        </div>
    );
};

export default TourType;