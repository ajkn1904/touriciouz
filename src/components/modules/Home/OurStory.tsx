"use client"
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="w-[85vw] mx-auto font-serif mt-40">
            <div className="flex flex-col lg:flex-row justify-between items-center">


                <div className="card-body lg:w-[500px]" data-aos="fade-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
                    <h2 className="card-title text-green-600 italic mb-5">Watch Our Story____</h2>
                    <h1 className="text-3xl font-semibold my-5 lg:w-[450px]">Unforgettable Travel Experiences Get Your Guide</h1>
                    <p className="lg:w-[450px]">The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.</p>
                    <div className="flex justify-center items-center gap-10 mt-16 mb-10">
                        <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-2xl shadow-blue-700">Contact Us</button>
                        <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-2xl shadow-blue-700">Book Now</button>
                    </div>
                </div>


                <iframe width="370" height="315" className="mx-auto sm:w-[470px] md:w-[560px] shadow-xl shadow-blue-100" src="https://www.youtube.com/embed/FCPdIvXo2rU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen data-aos="fade-right" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-once="false"></iframe>
            </div>




        </div>
    );
};

export default OurStory;