"use client"
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from 'react-icons/ai';
import AOS from "aos";
import "aos/dist/aos.css";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const Testimonials = () => {

    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div className="bg-liner-to-r from-green-50 my-8 py-32">
            <div className="mx-auto w-[80vw] font-serif">
                <h1 className="text-2xl font-semibold text-green-600 italic text-center" data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">Testimonials____</h1>
                <h2 className="text-3xl font-semibold my-10 text-center" data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">What Customer Say About Us</h2>


                <Swiper
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50
                    },
                }}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    
                    navigation={true}
                    
                    modules={[Autoplay, Navigation]}
                    className="mySwiper mx-auto"
                >
                    <SwiperSlide>
                        <div className="card bg-base-100 border" data-aos="flip-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
                            <div className="card-body">
                                <div className="flex my-4">
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                </div>

                                <p>`&quot;`Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent.`&quot;`</p>

                                <div className="mt-5 flex gap-3 justify-start items-center">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                            <Image width={64} height={64} src="/avater1.jpg" className="" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title">David Milt</h2>
                                        <p>CEO at IIC</p>
                                    </div>
                                </div>
                            </div>
                        </div></SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 border" data-aos="flip-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
                            <div className="card-body">
                                <div className="flex my-4">
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                </div>

                                <p>`&quot;`Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent.`&quot;`</p>
                                <div className="mt-5 flex gap-3 justify-start items-center">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                            <Image width={64} height={64}  src="/avater3.jpg" className="" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title">Abraham Link</h2>
                                        <p>CEO at AbC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 border" data-aos="flip-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
                            <div className="card-body">
                                <div className="flex my-4">
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                </div>

                                <p>`&quot;`Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent.`&quot;`</p>
                                <div className="mt-5 flex gap-3 justify-start items-center">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                            <Image width={64} height={64} src="/avater2.jpg" className="" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title">Albert Pisoor</h2>
                                        <p>CEO at ADLab</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide >
                </Swiper >




            </div>
        </div >
    );
};

export default Testimonials;