"use client"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Subscriptions = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);


    return (
        <div
            className="w-[90vw] sm:w-[80vw] lg:w-[60vw] mx-auto rounded-2xl font-serif bg-gradient-to-b from-green-600 to-blue-400 shadow-2xl shadow-blue-700 p-8 py-20 my-24 flex flex-col items-center"
            data-aos="zoom-in-left"
            data-aos-offset="10"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
        >
            <h1 className="text-xl sm:text-3xl font-semibold text-center text-white mb-4 leading-snug">
                Get Special Offers & <br />
                More From{" "}
                <span className="text-green-700 bg-white px-3 py-1 font-bold rounded-md">
                    Tour<span className="text-black">iciouz</span>
                </span>
            </h1>

            <p className="text-md sm:text-lg text-center text-white mb-6">
                Sign up now and get the best deals straight in your inbox!
            </p>

            <div className="flex flex-row w-full sm:w-auto justify-center items-center">
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full sm:w-[300px] h-12 px-4 rounded-l-md border-y-2 border-l-2 border-green-500 focus:outline-none bg-white text-black"
                />
                <button className="w-36 h-12 bg-gray-800 rounded-r-md border-y-2 border-r-2 border-green-500 hover:bg-green-600 text-white transition-all duration-300">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default Subscriptions;
