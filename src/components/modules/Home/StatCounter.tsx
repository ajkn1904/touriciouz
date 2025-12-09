"use client"
import { TiGroup } from 'react-icons/ti';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { GiHiking } from 'react-icons/gi';
import { RiHotelFill } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';



const StatCounter = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    const CountUp = dynamic(import('react-countup'), { ssr: false })

    return (
        <div className='w-[85vw] mx-auto flex flex-col lg:flex-row justify-center items-center mt-40 mb-20' data-aos="zoom-in" data-aos-offset="10" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">

            <div className='flex gap-12 h-[200px] md:h-[250px] lg:h-[200px] border-b lg:border-b-0 lg:border-r md:pr-5 md:gap-r-0 lg:pr-0'>


                <div className='border-r w-[200px] md:w-[270px] h-[200px] md:h-[250px] px-3 py-5 md:p-12 lg:h-[200px] lg:w-[210px] lg:p-5'>
                    <TiGroup className='h-24 w-24 rounded-full bg-green-200 border-8 border-green-100 p-5 text-green-800' />
                    <h1 className='text-4xl font-semibold'>
                        <CountUp start={99900} end={100000} delay={0} enableScrollSpy={true} />
                        <span>+</span>
                    </h1>
                    <p className='text-lg'>Counter One</p>
                </div>

                <div className='w-[170px] h-[200px] md:w-[200px] md:h-[300px] p-5 md:p-12 lg:h-[200px] lg:w-[210px] lg:p-5'>
                    <MdOutlineTravelExplore className='h-24 w-24 rounded-full bg-green-200 border-8 border-green-100 p-5 text-green-800' />
                    <h1 className='text-4xl font-semibold'>
                        <CountUp start={4950} end={5000} delay={0} enableScrollSpy={true} />
                        <span>+</span>
                    </h1>
                    <p className='text-lg'>Destinations</p>

                </div>
            </div>




            <div className='flex gap-12 md:pl-5 md:gap-l-0 h-[200px]'>
                <div className='border-r w-[200px] md:w-[230px] h-[200px] md:h-[250px] px-3 py-5 md:px-4 md:py-12 lg:h-[200px] lg:w-[210px] lg:p-5'>
                    <GiHiking className='h-24 w-24 rounded-full bg-green-200 border-8 border-green-100 p-5 text-green-800' />
                    <h1 className='text-4xl font-semibold'>
                        <CountUp start={9920} end={10000} delay={0} enableScrollSpy={true} />
                        <span>+</span>
                    </h1>
                    <p className='text-lg'>More Trips</p>
                </div>

                <div className='w-[170px] h-[200px] p-5 md:w-[200px] md:h-[300px] md:p-12 lg:h-[200px] lg:p-5 lg:w-[210px]'>
                    <RiHotelFill className='h-24 w-24 rounded-full bg-green-200 border-8 border-green-100 p-5 text-green-800' />
                    <h1 className='text-4xl font-semibold'>
                        <CountUp start={1950} end={2000} delay={0} enableScrollSpy={true} />
                        <span>+</span>
                    </h1>
                    <p className='text-lg'>Luxary Hotel</p>
                </div>
            </div>

        </div>
    );
};

export default StatCounter;