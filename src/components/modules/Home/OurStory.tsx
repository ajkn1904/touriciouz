/* eslint-disable @typescript-eslint/no-require-imports */

"use client"
import { useEffect } from 'react';
import "aos/dist/aos.css";

const OurStory = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);


    return (
        <div className="w-[90%] max-w-7xl mx-auto font-serif mt-36 overflow-hidden">
            <h2 className="text-2xl font-semibold text-green-600 italic mb-3">Watch Our Story____</h2>
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-16">
                {/* Text Content */}
                <div className="lg:w-[500px] flex flex-col" data-aos="fade-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="true">
                    <h1 className="text-3xl sm:text-4xl font-semibold mb-5">Unforgettable Travel Experiences Get Your Guide</h1>
                    <p className="text-md mb-10">The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.</p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-green-700 hover:scale-105 transition transform duration-300 w-full sm:w-auto text-center">
                            Contact Us
                        </button>
                        <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-green-700 hover:scale-105 transition transform duration-300 w-full sm:w-auto text-center">
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Video */}
                <div className="w-full lg:w-[50%] flex justify-center" data-aos="fade-right" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-once="true">
                    <iframe
                        className="w-full h-[215px] sm:h-[315px] md:h-[350px] shadow-xl rounded-lg"
                        src="https://www.youtube.com/embed/FCPdIvXo2rU"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>
        </div>
    );
};

export default OurStory;
