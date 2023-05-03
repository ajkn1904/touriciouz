import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import styles from "../../styles/Banner.module.css"
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import LightSpeed from 'react-reveal/LightSpeed';




const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <div className={styles.bannerImg}>
            <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" alt="" />
          </div>

          <div className="absolute top-1 left-[8%]">
            <Fade right cascade>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]">Find Your Special Tour Today</h1>

                <br />

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[160px] sm:top-[200px] md:top-[240px] lg:top-[210px] w-[80vw]">With <span className="text-green-700 bg-white p-2 font-bold"> Tour<span className="text-black">iciouz</span></span>  </h1>
              </div>
            </Fade>


            <LightSpeed bottom left>
              <p className="absolute text-md  sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-gradient-to-r from-white bg-opacity-70 p-4">
                Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.
              </p>
            </LightSpeed>

            <Slide bottom>
              <button className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px] hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
                <p className="absolute">Explore Tour</p></button>
            </Slide>
          </div>
        </SwiperSlide>




        <SwiperSlide>
          <div className={styles.bannerImg}>
            <img className="h-[550px]  md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
          </div>

          <div className="absolute top-1 left-[8%]">
            <Fade right cascade>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]">Start Your Tour</h1>
                <br />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[160px] sm:top-[200px] md:top-[210px] w-[80vw]">With <span className="text-green-700 bg-white p-2 font-bold"> Tour<span className="text-black">iciouz</span></span>  </h1>
              </div>
            </Fade>


            <LightSpeed bottom left>
              <p className="absolute text-md  sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-gradient-to-r from-white bg-opacity-70 p-4">
                Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.
              </p>
            </LightSpeed>

            <Slide bottom>
              <button className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px] hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
                <p className="absolute">Explore Tour</p></button>
            </Slide>
          </div>
        </SwiperSlide>




        <SwiperSlide>
          <div className={styles.bannerImg}>
            <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
          </div>

          <div className="absolute top-1 left-[8%]">
            <Fade right cascade>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]">For The Best Deal Travel</h1>
                <br />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[160px] sm:top-[200px] md:top-[210px] w-[80vw]">With <span className="text-green-700 bg-white p-2 font-bold"> Tour<span className="text-black">iciouz</span></span>  </h1>
              </div>
            </Fade>


            <LightSpeed bottom left>
              <p className="absolute text-md  sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-gradient-to-r from-white bg-opacity-70 p-4">
                Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.
              </p>
            </LightSpeed>

            <Slide bottom>
              <button className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px] hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
                <p className="absolute">Explore Tour</p></button>
            </Slide>
          </div>
        </SwiperSlide>




        <SwiperSlide>
          <div className={styles.bannerImg}>
            <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1562583078-9a9e329f2185?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
          </div>

          <div className="absolute top-1 left-[8%]">
            <Fade right cascade>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]">Gether You Best Experience</h1>
                <br />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[160px] sm:top-[200px] md:top-[240px] lg:top-[210px] w-[80vw]">With <span className="text-green-700 bg-white p-2 font-bold"> Tour<span className="text-black">iciouz</span></span>  </h1>
              </div>
            </Fade>


            <LightSpeed bottom left>
              <p className="absolute text-md  sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-gradient-to-r from-white bg-opacity-70 p-4">
                Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.
              </p>
            </LightSpeed>

            <Slide bottom>
              <button className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px] hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
                <p className="absolute">Explore Tour</p></button>
            </Slide>
          </div>
        </SwiperSlide>





        <SwiperSlide>
          <div className={styles.bannerImg}>
            <img className="h-[550px] md:h-[600px] lg:h-[680px] w-full" src="https://images.unsplash.com/photo-1518317507427-5346735246ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
          </div>

          <div className="absolute top-1 left-[8%]">
            <Fade right cascade>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[100px] w-[90vw]">Make Your Holiday Memorable</h1>
                <br />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif absolute top-[160px] sm:top-[200px] md:top-[240px] lg:top-[210px] w-[80vw]">With <span className="text-green-700 bg-white p-2 font-bold"> Tour<span className="text-black">iciouz</span></span>  </h1>
              </div>
            </Fade>
            <LightSpeed bottom left>
              <p className="absolute text-md  sm:text-lg lg:text-xl w-[90vw] md:w-[80vw] lg:w-[800px] top-[250px] sm:top-[310px] md:top-[360px] bg-gradient-to-r from-white bg-opacity-70 p-4">
                Awesome Hotel & Ticket & also Tour With Best Experience. Intrinsicly architect superior core competencies vis-a-vis interactive partnership.
              </p>
            </LightSpeed>

            <Slide bottom>
              <button className="btn w-36 absolute top-[380px] sm:top-[440px] md:top-[480px] hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
                <p className="absolute">Explore Tour</p></button>
            </Slide>
          </div>
        </SwiperSlide>



      </Swiper>



    </>
  );
};

export default Banner;