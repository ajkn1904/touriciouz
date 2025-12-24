"use client";
/* eslint-disable @typescript-eslint/no-require-imports */

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from 'react-icons/ai';
import { FaQuoteLeft } from 'react-icons/fa';
import "aos/dist/aos.css";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from 'framer-motion';

const Testimonials = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);

    const testimonialData = [
        {
            name: "Sarah Johnson",
            role: "Adventure Traveler",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            text: "Himalayan trek was amazing! Guide Raj knew all trails perfectly. Everything arranged well. Ready for next adventure with you!",
            rating: 5,
            tour: "Everest Base Camp Trek"
        },
        {
            name: "Michael Chen",
            role: "Cultural Explorer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Kyoto cultural tour was fantastic! Hidden temples, private ceremonies. Secure platform made booking completely stress-free.",
            rating: 5,
            tour: "Kyoto Cultural Tour"
        },
        {
            name: "Elena Rodriguez",
            role: "Family Vacationer",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Bali family package was perfect! Guides amazing with kids, activities well-paced. Best family vacation we've experienced.",
            rating: 4,
            tour: "Bali Family Adventure"
        },
        {
            name: "James Wilson",
            role: "Photography Expert",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Iceland photography tour fantastic! Guide knew best Northern Lights spots. Small group size made experience special.",
            rating: 5,
            tour: "Iceland Photo Tour"
        },
        {
            name: "Priya Sharma",
            role: "Food Travel Blogger",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            text: "Italian food tour was dreamlike! Truffle hunting, wine tasting felt authentic. Connected with local producers perfectly.",
            rating: 4,
            tour: "Tuscan Culinary Trip"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 my-8 py-16 md:py-32">
            <motion.div
                className="px-4 sm:px-6 lg:px-8 font-serif max-w-7xl mx-auto"
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false"
            >
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-semibold text-green-600 italic mb-4">
                        Traveler Stories____
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        What Our Travelers Say
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Real experiences from travelers who&apos;ve explored the world with our certified guides
                    </p>
                </div>

                <Swiper
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                    loop={true}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Autoplay, Navigation]}
                    className="pb-12"
                >
                    {testimonialData.map((t, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full mx-2 my-5">
                                <div className="mb-6">
                                    <FaQuoteLeft className="text-green-500/30 h-12 w-12 mb-4" />
                                    <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                                        &quot;{t.text}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center mb-4">
                                        <div className="flex mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <AiFillStar
                                                    key={i}
                                                    className={`h-5 w-5 ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">
                                            {t.rating}.0 Rating
                                        </span>
                                    </div>

                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-100">
                                                <Image
                                                    src={t.avatar}
                                                    alt={t.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <AiFillStar className="text-white h-3 w-3" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{t.name}</h3>
                                            {/* <p className="text-gray-600 text-sm">{t.role}</p> */}
                                            <p className="text-green-600 text-sm font-medium mt-1">
                                                {t.tour}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* Custom navigation buttons */}
                    <div className="swiper-button-prev !text-green-600 !left-0"></div>
                    <div className="swiper-button-next !text-green-600 !right-0"></div>
                </Swiper>

            </motion.div>
        </div>
    );
};

export default Testimonials;