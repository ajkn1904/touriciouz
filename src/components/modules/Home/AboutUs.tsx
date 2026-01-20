"use client";
/* eslint-disable @typescript-eslint/no-require-imports */

import { SlBadge } from 'react-icons/sl';
import { GiPodiumWinner } from 'react-icons/gi';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init();
        }
    }, []);


    return (
        <div className="flex flex-col lg:flex-row my-24 max-w-7xl w-[90%] mx-auto font-serif overflow-hidden">

            {/* Left Image Section */}
            <div
                className="relative h-[800px] lg:w-[50%] lg:mr-10"
                style={{ backgroundImage: `url(aboutUs1.png)`, backgroundRepeat: 'space' }}
                data-aos="fade-right"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
            >
                <Image
                    width={560}
                    height={560}
                    className="h-[560px] w-[70%] min-w-[400px] rounded-xl"
                    src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
                    alt=""
                />
                <Image
                    width={350}
                    height={470}
                    className="h-[440px] md:h-[470px] w-[70%] min-w-[250px] max-w-[350px] border-[14px] border-yellow-100 rounded-3xl absolute top-56 left-38 sm:left-75 md:left-96 lg:left-[220px] xl:left-[300px]"
                    src="https://images.unsplash.com/photo-1549937917-fa299d66a38d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80"
                    alt=""
                />
            </div>

            {/* Right Content Section */}
            <div
                className="lg:ml-24 w-[90vw] lg:w-[40%] xl:w-[50%] mx-auto flex flex-col"
                data-aos="fade-left"
                data-aos-offset="10"
                data-aos-delay="100"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
            >
                <h2 className="text-2xl font-semibold mb-4 text-green-600 italic">Get About Us____</h2>
                <h1 className="text-3xl font-semibold my-5">We Create Journeys Worth Taking For The Tourists</h1>
                <p className="text-gray-700">
                    At Touriciouz, we believe travel should be transformative, not transactional. Since our founding, we`&apos;`ve connected adventurous souls with authentic local experiences through our platform of certified guides.
                </p>

                <p className="text-gray-700">
                    Our mission is simple: to make extraordinary travel accessible to everyone. We carefully vet every guide, curate unique itineraries, and ensure seamless experiences from booking to journey`&apos;`s end.
                </p>

                <p className="text-gray-700 mb-5">
                    Whether you`&apos;`re seeking mountain adventures, cultural immersions, or relaxing getaways, we bridge the gap between passionate travelers and knowledgeable local experts who share their world with authenticity.
                </p>

                {/* Stats Section */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-5">
                    <div className="flex items-start gap-4 lg:w-[200px]">
                        <SlBadge className="h-10 w-16 border border-green-600 rounded-lg text-green-600 p-2" />
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">24 Years Experience</h2>
                            <p className="text-sm">Creating memorable travel experiences Worldwide.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 lg:w-[200px]">
                        <GiPodiumWinner className="h-10 w-16 border border-green-600 rounded-lg text-green-600 p-2" />
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Best Tour Agents</h2>
                            <p className="text-sm">Certified experts covering diverse destinations.</p>
                        </div>
                    </div>
                </div>

                <hr className="mb-5" />

                {/* Button + Avatar Section */}
                <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-center gap-2 mb-5">
                    <Link href={"/about"} className="relative w-40 h-12 flex items-center justify-center rounded-lg
                             bg-green-600 text-white text-lg font-semibold
                             border-2 border-green-500
                             shadow-lg shadow-blue-300
                             hover:border-yellow-500
                             transition-all duration-300">
                        Discover More
                    </Link>

                    <div className='flex flex-col sm:items-end gap-2'>
                        <div className="flex items-center -space-x-6">
                            {['/avater1.jpg', '/avater2.jpg', '/avater3.jpg'].map((src, idx) => (
                                <div key={idx} className="w-12 relative">
                                    <Image src={src} alt={`Avatar ${idx + 1}`} width={48} height={48} className="rounded-full border-2 border-white" />
                                </div>
                            ))}
                            <div className="w-12 h-12 bg-green-500/80 text-white flex items-center justify-center rounded-full text-sm font-semibold z-10">
                                +
                            </div>
                        </div>
                        <p className="sm:text-end text-lg font-semibold">
                            <span className="text-green-600 text-xl">500k+ </span> Happy Customer
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AboutUs;
