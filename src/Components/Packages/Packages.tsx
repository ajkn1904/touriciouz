import React from 'react';

const Packages = ({ data }: any) => {
    console.log(data);
    return (
        <div key={data._id} className="card md:card-side bg-base-100 shadow-xl my-20">
            <figure className=''><img src={data.thumbnail_image} className='h-[250px] sm:h-[300px] w-full md:w-[300px]' alt="Movie" /></figure>
            <div className="card-body md:w-[900px]">
                <h2 className="card-title">{data.name}</h2>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-2xl shadow-blue-700">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default Packages;