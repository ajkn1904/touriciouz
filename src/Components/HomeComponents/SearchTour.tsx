
const SearchTour = () => {
    return (
        <div className="flex justify-center h-[400px] md:h-[250px] lg:h-[150px]">


            <div className="mx-auto w-[400px] md:w-[90vw] font-serif border rounded-lg p-5 absolute top-[630px] sm:top-[640px] md:top-[690px] lg:top-[740px] z-10 bg-white">

                <h3 className="text-center text-2xl text-green-600 italic font-semibold my-3">Search Tours__</h3>
                <p className="text-center ">Find your dream tour today from here!</p>


                <form className="grid md:grid-cols-2 lg:grid-cols-4 justify-items-center my-2">


                    <input type="text" placeholder="Destination" className="input input-bordered focus:input-success w-80 md:w-[95%] mx-auto my-3 md:m-3" />

                    <input type="text" placeholder="Tour Type" className="input input-bordered focus:input-success w-80 md:w-[95%] mx-auto my-3 md:m-3" />

                    <input type="text" placeholder="0 Days - 10 Days" className="input input-bordered focus:input-success w-80 md:w-[95%] mx-auto my-3 md:m-3" />

                    <input type="month" className="input input-bordered focus:input-success w-80 md:w-[95%] mx-auto my-3 md:m-3" />


                </form>
            </div>
        </div>
    );
};

export default SearchTour;