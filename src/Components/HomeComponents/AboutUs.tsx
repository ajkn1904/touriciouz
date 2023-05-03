import { SlBadge } from 'react-icons/sl'
import { GiPodiumWinner } from 'react-icons/gi'


const AboutUs = () => {
    return (
        <div className="card lg:card-side my-24 w-[88vw] m-auto font-serif">

            <div className="h-[800px] lg:w-[50%] lg:mr-10" style={{ backgroundImage: `url(aboutUs1.png)`, backgroundRepeat: 'space' }}>

                <img className="h-[560px] w-[70%] min-w-[400px] rounded-xl" src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="" />
                <img className="h-[470px] w-[50%] min-w-[250px] lg:max-w-[350px] border-[14px] border-yellow-100 rounded-3xl absolute top-56 left-48 sm:left-80 md:left-96 lg:left-[220px] xl:left-[300px]" src="https://images.unsplash.com/photo-1549937917-fa299d66a38d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80" alt="" />

            </div>
            <div className="card-body lg:ml-24 w-[90vw] lg:w-[40%] xl:w-[50%] mx-auto">
                <div>
                    <h2 className="card-title text-green-600 italic">Get About Us__________</h2>
                    <h1 className="text-3xl font-semibold my-5">We Create Journeys Worth Taking For The Tourists</h1>
                    <p>Progressively impact multidisciplinary leadership skills via e-business leadership skills. Holisticly repurpose multifunctional data before turnkey information. Globally restore client-focused potentialities before scalable core competencies.Progressively impact multidisciplinary leadership skills via e-business leadership skills. Holisticly repurpose multifunctional data before turnkey information. Globally restore client-focused potentialities before scalable core competencies.Progressively impact multidisciplinary leadership skills via e-business leadership skills. Holisticly repurpose multifunctional data before turnkey information.</p>
                </div>

                <div className="flex justify-between items-center gap-3 my-5 flex-col sm:flex-row">

                    <div className='flex justify-center gap-4 lg:w-[200px]'>
                        <SlBadge className="h-10 w-16 border border-green-600 rounded-lg text-green-600 p-2" />
                        <div>
                            <h2 className="text-2xl mb-3 font-semibold"> 24 Years Experience</h2>
                            <p>Holisticly procrastinate real-time solutions for services.</p>
                        </div>
                    </div>

                    <div className='flex justify-center gap-4 lg:w-[200px]'>
                        <GiPodiumWinner className="h-10 w-16 border border-green-600 rounded-lg text-green-600 p-2" />
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">Best Tour Agents</h2>
                            <p>Holisticly procrastinate real-time solutions for services.</p>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="card-actions flex justify-between items-center gap-3 my-3">
                    <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-2xl shadow-blue-700">Discover More</button>

                    <div>
                        <div className="avatar-group -space-x-7">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="avater1.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="avater2.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="avater3.jpg" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-12 bg-green-500 bg-opacity-90 text-neutral-content">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                        <p className='my-1 text-end'> <span className='text-green-600 font-semibold text-xl'>500k+ </span> Happy Customer</p>
            </div>



        </div>
    );
};

export default AboutUs;