"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from 'react-icons/ai';
import AOS from "aos";
import "aos/dist/aos.css";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);


    const testimonialData = [
        {
            name: "David Milt",
            role: "CEO at IIC",
            avatar: "/avater1.jpg",
            text: "Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent."
        },
        {
            name: "Abraham Link",
            role: "CEO at AbC",
            avatar: "/avater3.jpg",
            text: "Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent."
        },
        {
            name: "Albert Pisoor",
            role: "CEO at ADLab",
            avatar: "/avater2.jpg",
            text: "Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies phosfluorescently reinvent."
        }
    ];

    return (
        <div className="bg-gradient-to-r from-green-50 my-8 py-32">
            <div className="mx-auto w-[80vw] font-serif">
                <h1 className="text-2xl font-semibold text-green-600 italic text-center mb-4"
                    data-aos="fade-up"
                    data-aos-offset="10"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="false"
                >
                    Testimonials____
                </h1>
                <h2 className="text-3xl font-semibold text-center mb-16"
                    data-aos="fade-up"
                    data-aos-offset="10"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="false"
                >
                    What Customer Say About Us
                </h2>

                <Swiper
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 50 },
                    }}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="mx-auto !z-0 !relative"
                >
                    {testimonialData.map((t, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="card bg-white rounded-2xl border p-6"
                                data-aos="flip-left"
                                data-aos-offset="10"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-once="false"
                            >
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <AiFillStar key={i} className="text-yellow-400 h-5 w-5" />
                                    ))}
                                </div>
                                <p className="mb-5">{t.text}</p>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-full overflow-hidden">
                                            <Image src={t.avatar} alt={t.name} width={64} height={64} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="card-title">{t.name}</h3>
                                        <p>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
