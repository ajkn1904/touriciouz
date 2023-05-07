import React, { useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive, BiDumbbell } from 'react-icons/bi';
import initAOS from '../../../aos';
import Link from 'next/link';
import TourDetails from '@/pages/TourDetails';

const Packages = ({ data }: any) => {

    useEffect(() => {
        initAOS();
    }, []);

    //console.log(data);

    const previousPrice = data.price + 1700


    return (
        <div key={data._id} className="card md:card-side bg-base-100 shadow-xl my-20" data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">

            <figure data-aos="zoom-in" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
                <img src={data.thumbnail_image} className='h-[250px] sm:h-[280px] w-full md:w-[300px]' alt="Movie" />
            </figure>


            <div className="card-body md:w-[900px] flex sm:flex-row" data-aos="fade-right" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1100" data-aos-easing="ease-in-out" data-aos-once="false">


                <div className='sm:w-[70%] sm:border-r sm:pr-3 sm:mr-3'>
                    <h2 className="card-title">{data.name}</h2>
                    <p>{data.description.slice(0, 120)}...</p>

                    <div className='flex justify-start items-center gap-2 mt-8'>
                        <div className='flex items-center gap-2 bg-gray-100 px-3 py-1'>
                            <BiTimeFive className='text-green-600 h-5 w-5' />
                            <p>{data.duration} days</p>
                        </div>
                        <div className='flex items-center gap-2 bg-gray-100 px-3 py-1'>
                            <BiDumbbell className='text-green-600 h-5 w-5' />
                            <p>{data.physicality}</p>
                        </div>
                    </div>
                </div>



                <div className="flex-col w-[150px] items-center md:mx-auto" data-aos="fade-left" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1200" data-aos-easing="ease-in-out" data-aos-once="false">

                    <div className="flex gap-1 mt-10 sm:mt-0 md:mt-1">
                        <AiFillStar className="text-yellow-400 h-5 w-5" />
                        <AiFillStar className="text-yellow-400 h-5 w-5" />
                        <AiFillStar className="text-yellow-400 h-5 w-5" />
                        <AiFillStar className="text-yellow-400 h-5 w-5" />
                        <AiFillStar className="text-yellow-400 h-5 w-5" />
                    </div>

                    <p className='text-2xl font-semibold text-blue-400 my-2 md:mt-2 line-through'>$ {previousPrice}</p>

                    <p className='text-4xl font-semibold text-blue-600 mt-2 md:mt-0 '>$ {data.price}</p>

                    <p className='mb-5 text-gray-400'>per person</p>

                    <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-lg shadow-blue-300"><Link href="/TourDetails">View Details</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Packages;