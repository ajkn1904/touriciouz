import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper";

import { AiFillStar } from 'react-icons/ai';

const Testimonials = () => {
    return (
        <div className="bg-gradient-to-r from-green-50 my-8 py-32">
            <div className="mx-auto w-[80vw] font-serif">
                <h1 className="text-2xl font-semibold text-green-600 italic text-center">Testimonials____</h1>
                <h2 className="text-3xl font-semibold my-10 text-center">What Customer Say About Us</h2>


                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}

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
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay]}
                    className="mx-auto"
                >
                    <SwiperSlide>
                        <div className="card bg-base-100 border">
                            <div className="card-body">
                                <div className="flex my-4">
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                </div>

                                <p>"Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent."</p>

                                <div className="mt-5 flex gap-3 justify-start items-center">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                            <img src="avater1.jpg" className="" alt="" />
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
                        <div className="card bg-base-100 border">
                            <div className="card-body">
                                <div className="flex my-4">
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                </div>

                                <p>"Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent."</p>
                                <div className="mt-5 flex gap-3 justify-start items-center">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                            <img src="avater1.jpg" className="" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title">Abraham Linklon </h2>
                                        <p>CEO at AbC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 border">
                            <div className="card-body">
                                <div className="flex my-4">
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                    <AiFillStar className="text-yellow-400 h-5 w-5" />
                                </div>

                                <p>"Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent."</p>
                                <div className="mt-5 flex gap-3 justify-start items-center">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                            <img src="avater1.jpg" className="" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title">Albert Pisoor</h2>
                                        <p>CEO at ADIvah</p>
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