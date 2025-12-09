"use client"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const Subscriptions = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="w-[80vw] lg:w-[60vw] mx-auto rounded-md h-[330px] font-serif bg-liner-to-b from-green-600 to-blue-400 shadow-2xl shadow-blue-700 p-5 my-36" data-aos="zoom-in-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
            <h1 className="text-xl sm:text-3xl font-semibold text-center text-white mt-10 mb-5 mx-auto">Get Special Offers & <br /> More From <span className="text-green-700 bg-white px-2 py-1 font-bold"> Tour<span className="text-black">iciouz</span></span> </h1>
            <p className="text-lg text-center text-white mb-5">Sign up now and get the best deals straight in your inbox!</p>
            <div className="flex gap-3 justify-center items-center">
                <input type="email" placeholder="Enter Your Email" className="input input-bordered" />
                <button className="btn w-36 sm:top-[440px] md:top-[480px] hover:border-warning border-2 shadow-2xl shadow-green-500 flex justify-center items-center">Subscribe</button>
            </div>

        </div>
    );
};

export default Subscriptions;