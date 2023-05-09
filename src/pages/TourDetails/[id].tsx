import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { BiDumbbell, BiTimeFive } from "react-icons/bi";
import { TiGlobeOutline, TiTick } from "react-icons/ti";
import { RiUserStarLine } from "react-icons/ri";
import { FcOvertime } from "react-icons/fc";
import { ImCross } from "react-icons/im";



const TourDetails = (/* { pack }: any */) => {

    //console.log(pack);


    /*     const router = useRouter();
        const handleBack = () => {
            router.push("/Tours")
        }
    
        console.log(router.query.id); */

    /*     const [ isLoading, setIsLoading] = useState(true)
        const [ tours, setTours] = useState({})
    
        useEffect(() => {
            fetch(`http://localhost:5000/packages/${router?.query?.id}`)
            .then(res => res.json())
            .then(data => {
                setTours(data);
                setIsLoading(false);
            })
        }, [router.query.id])
        
        
        
        if(isLoading){
            return <h1>Loading....</h1>
        } */


    const [isLoading, setIsLoading] = useState(true);
    const [tours, setTours]: any = useState({})
    const router = useRouter();
    console.log(router.query.id);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:5000/packages/${router?.query?.id}`);
                const data = await response.json();
                setTours(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [router.query.id]);


    /*useEffect(() => {
         async function fetchData() {
            const response = await fetch(
                `http://localhost:5000/packages/${router.query.id}`
                );
                const data = await response.json();
                setTours(data);
                setIsLoading(false);
            }  
            fetchData();
        }, [router?.query?.id]); */



    /* useEffect(() => {
        fetch(`http://localhost:5000/packages/${router?.query?.id}`)
        .then(res => res.json())
        .then(data => {
            setTours(data);
            setIsLoading(false);
        })
    }, [router.query.id]) */

    if (isLoading) {
        return <p className="text-gray-400">loading...</p>;
    }

    console.log(tours)


    return (
        <div className="font-serif">
            <NavBar />

            <img src={tours.thumbnail_image} className="w-screen h-[600px] lg:h-[650px]" alt="" />

            <div className="w-[85vw] mx-auto border shadow-lg">


                <div>
                    <div className="flex justify-center items-center flex-col md:flex-row">
                        <div className="flex justify-center items-center md:gap-3 lg:gap-5 border md:p-2 lg:p-5 w-full h-[100px] md:h-[150px]">
                            <BiTimeFive className="h-6 w-6 text-green-700" />
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold">{tours.duration} Days</h3>
                                <p className="text-gray-400 text-lg">Duration</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center md:gap-3 lg:gap-5 border md:p-2 lg:p-5 w-full h-[100px] md:h-[150px]">
                            <BiDumbbell className="h-6 w-6 text-green-700" />
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold">{tours.physicality}</h3>
                                <p className="text-gray-400 text-lg">Physicality</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center md:gap-3 lg:gap-5 border md:p-2 lg:p-5 w-full h-[100px] md:h-[150px]">
                            <TiGlobeOutline className="h-6 w-6 text-green-700" />
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold">{tours.location}</h3>
                                <p className="text-gray-400 text-lg">Location</p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center md:gap-3 lg:gap-5 border md:p-2 lg:p-5 w-full h-[100px] md:h-[150px]">
                            <RiUserStarLine className="h-6 w-6 text-green-700" />
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold">{tours.age_limit}</h3>
                                <p className="text-gray-400 text-lg">Age</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center md:gap-3 lg:gap-5 border md:p-2 lg:p-5 w-full h-[100px] md:h-[150px]">
                            <FcOvertime className="h-6 w-6 text-green-700" />
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold">Jan - Dec</h3>
                                <p className="text-gray-400 text-lg">Season</p>
                            </div>
                        </div>
                    </div>
                </div>



                <p className="text-lg my-10 w-[90%] mx-auto">{tours.description}</p>

                <hr className="w-[65vw] mx-auto border border-green-200" />

                <div className="w-[90%] mx-auto p-10 flex flex-col md:flex-row gap-3 justify-start md:items-center">
                    <h3 className="text-lg font-semibold my-2 md:my-0 italic md:w-[45%] lg:w-[33%] text-blue-600">DEPARTURE/RETURN LOCATION</h3>
                    <p className=" md:w-[60%] lg:w-[70%]">{tours.departure}</p>
                </div>


                <hr className="w-[65vw] mx-auto border border-green-200" />

                <div className="w-[90%] mx-auto p-10 flex flex-col md:flex-row gap-3 justify-start md:items-center">
                    <h3 className="text-lg font-semibold my-2 md:my-0 italic md:w-[45%] lg:w-[33%] text-blue-600">DEPARTURE TIME</h3>
                    <p className="md:w-[60%] lg:w-[70%]">Please arrive at least 2 hours before {tours.departure_time} to reach your flight. </p>
                </div>

                <hr className="w-[65vw] mx-auto border border-green-200" />

                <div className="w-[90%] mx-auto p-10 flex flex-col md:flex-row gap-3 justify-start md:items-center">
                    <h3 className="text-lg font-semibold my-2 md:my-0 italic md:w-[40%] lg:w-[30%] text-blue-600">INCLUDED</h3>


                    <div className="flex flex-wrap md:w-[60%] lg:w-[70%]">
                        {
                            tours.included_locations.map((included: string, i: number) => <div key={i} className="flex justify-start items-center gap-2 mx-3">
                                <TiTick className="text-green-600 h-6 w-6" />
                                <p className="">{included}</p>
                            </div>)
                        }
                    </div>
                </div>



                <hr className="w-[65vw] mx-auto border border-green-200" />

                <div className="w-[90%] mx-auto p-10 flex flex-col md:flex-row gap-3 justify-start md:items-center">
                    <h3 className="text-lg font-semibold my-2 md:my-0 italic md:w-[40%] lg:w-[30%] text-blue-600">NOT INCLUDED</h3>

                    <div className="flex flex-wrap md:w-[60%] lg:w-[70%]">

                        {
                            tours.not_included_locations.map((included: string, i: number) => <div key={i} className="flex justify-start items-center gap-2 mx-3">
                                <ImCross className="text-red-700 h-4 w-4" />
                                <p className="">{included}</p>

                            </div>)
                        }
                    </div>
                </div>

                <hr className="w-[65vw] mx-auto border border-green-200" />

                <p className="text-lg my-10 w-[90%] mx-auto">{tours.description}</p>


                {/* <button onClick={handleBack}>Back</button> */}

            </div>
        </div>



    );
};



/* export const getServerSideProps = async (context: any) => {

    const {params} = context;

            const res = await fetch(`http://localhost:5000/packages/${params?.packId}`);
            const data = await res.json();

            return {
                props: {
                pack: data
        }
    }
}



export const getServerSidePaths = async () => {
    const res = await fetch('http://localhost:5000/packages');
            const data = await res.json()


    const paths =  data?.map((pack: any) => {
        return {
                params: {
                packId: `${pack._id}`
            }
        }
    })

            return {
                paths,
                fallback: false
    }
} */


export default TourDetails;
