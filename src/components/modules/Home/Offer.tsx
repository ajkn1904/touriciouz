/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { useEffect } from 'react';
import styles from '../../../styles/Offer.module.css';
import "aos/dist/aos.css";

const Offer = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);


    const offers: {
        id: number;
        title: string;
        text: string;
        img: string;
    }[] = [
            {
                id: 1,
                title: '45% OFF',
                text: 'Explore The World Tour Hotel Booking.',
                img: 'https://i.ibb.co/3h4sfKx/offer1.png'
            },
            {
                id: 2,
                title: '35% OFF',
                text: 'On Flight Ticket Grab This Now.',
                img: 'https://i.ibb.co/gtv31Qt/offer2.png'
            }
        ];

    return (
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-7 xl:gap-16 justify-center items-center my-48 max-w-7xl w-[90%] mx-auto'>
            {offers.map(ofr => (
                <div
                    key={ofr.id}
                    className="relative w-full h-[390px] shadow-xl rounded-xl overflow-hidden"
                    style={{
                        backgroundImage: `url(${ofr.img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '220px -60px',
                        backgroundSize: 'cover'
                    }}
                    data-aos="fade-up"
                    data-aos-offset="70"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-purple-600/60 to-green-600/40 rounded-xl p-6 flex flex-col justify-center font-serif text-white border-2 border-yellow-400 shadow-lg shadow-yellow-200">
                        <h2 className={`${styles.glow} text-4xl lg:text-5xl font-bold`}>{ofr.title}</h2>
                        <p className='text-2xl lg:text-3xl font-bold mt-5'>{ofr.text}</p>
                        <div className="mt-6">
                            <button className="relative w-40 h-12 flex items-center justify-center rounded-lg 
                                 bg-green-900 text-white font-semibold text-lg 
                                 border-2 border-green-500 shadow-2xl shadow-blue-700 
                                 hover:border-yellow-500 transition-all duration-300">
                                {/* Ping Circle */}
                                <span className="relative flex h-5 w-5 mr-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400/95 animate-ping"></span>
                                    <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-500"></span>
                                </span>
                                <span>Book Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Offer;
