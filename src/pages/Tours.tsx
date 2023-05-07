import React from 'react';
import NavBar from './NavBar';
import Packages from '@/Components/Packages/Packages';



const Tours = ({ tourPackages }: any) => {

    //console.log(tourPackages);
    return (
        <div className='font-serif'>
            <NavBar />

            <h1 className="text-center text-2xl text-green-600 italic font-semibold my-10">All Packages_____</h1>


            <div className='w-[85vw] lg:w-[70vw] mx-auto max-w-[1200px]'>
                {
                    tourPackages && tourPackages.map((pack: any) => <Packages key={pack._id} data={pack} />)

                }
            </div>

        </div>


    );
};

export default Tours;


export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:5000/packages');
    const data = await res.json();

    return {
        props: {
            tourPackages: data
        }
    }
}