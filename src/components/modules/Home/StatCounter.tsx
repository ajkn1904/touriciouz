"use client";

import { TiGroup } from 'react-icons/ti';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { GiHiking } from 'react-icons/gi';
import { RiHotelFill } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import "aos/dist/aos.css";

const CountUp = dynamic(() => import('react-countup'), { ssr: false });

const StatCounter = () => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect when container is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: TiGroup, start: 99900, end: 100000, label: 'Happy Clients' },
    { icon: MdOutlineTravelExplore, start: 4950, end: 5000, label: 'Destinations' },
    { icon: GiHiking, start: 9920, end: 10000, label: 'More Trips' },
    { icon: RiHotelFill, start: 1950, end: 2000, label: 'Luxury Hotel' },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold my-4 text-green-600 italic mt-40 mb-10 text-center">
        What We Achieve____
      </h2>

      <div
        ref={containerRef}
        className="w-[85vw] mx-auto flex flex-col lg:flex-row justify-center items-center mb-20 gap-6"
        data-aos="zoom-in"
        data-aos-offset="10"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-[200px] md:w-[230px] lg:w-[210px] h-[200px] md:h-[250px] p-5 md:p-6 lg:p-5 border-b lg:border-b-0 lg:border-r last:border-r-0"
            >
              <Icon className="h-24 w-24 rounded-full bg-green-200 border-8 border-green-100 p-5 text-green-800 mb-3" />
              <h1 className="text-4xl font-semibold">
                {visible ? <CountUp start={stat.start} end={stat.end} duration={2} /> : stat.start}
                <span>+</span>
              </h1>
              <p className="text-lg text-center">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StatCounter;
