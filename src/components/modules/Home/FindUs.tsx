"use client";
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {motion} from 'framer-motion';

const MapComponent = dynamic(() => import('@/src/utils/MapContainer'), {
    ssr: false,
    loading: () => (
        <div className='w-full h-[500px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center'>
            <span className='text-gray-500'>Loading map...</span>
        </div>
    ),
});

const FindUs = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: false,
            });
        }
    }, []);

    return (
        <motion.div className='my-32 font-serif max-w-7xl w-[95%] mx-auto' data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
            <h2 className="text-center font-semibold text-2xl text-green-600 italic">Find Touriciouz____</h2>

            <h1 className="text-3xl font-semibold my-5 text-center">We Create Worth Journeys!</h1>

            <p className="text-lg lg:w-[50vw] mx-auto mt-5 mb-10 text-center">Visit our headquarters or connect with our local guides across popular destinations. We operate in major tourist hubs and remote locations alike, ensuring quality tours wherever adventure calls. Check our map for locations and contact points.
            </p>

            <div data-aos="flip-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false" className='h-[500px] mx-auto'>
                <MapComponent />
            </div>
        </motion.div>
    );
};

export default FindUs;