import img1 from '../../../public/offer1.png'
import img2 from '../../../public/offer2.png'


const Offer = () => {

    const offers: {
        id: number;
        title: string;
        text: string;
        img: string
    }[] = [{
        id: 1,
        title: '45% OFF',
        text: 'Explore The World Tour Hotel Booking.',
        img: 'https://i.ibb.co/3h4sfKx/offer1.png'
    },
    {
        id: 2,
        title: '35% OFF',
        text: 'On Flight Ticket Grab This Now.',
        img: 'https://i.ibb.co/gtv31Qt/offer2.png'
    }
        ]




    return (
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-7 xl:gap-16 justify-center items-center my-48 max-w-[1300px] mx-auto'>
            {
                offers.map(ofr =>
                    <div className="card w-[85%] lg:w-[70%] shadow-xl h-[350px]" key={ofr.id} style={{backgroundImage: `url(${ofr.img})`, backgroundRepeat: 'no-repeat', backgroundPosition: '220px -60px'}}>
                        <div className="card-body bg-gradient-to-r from-green-600 bg-blend-overlay bg-purple-500 bg-opacity-30 rounded-xl text-white font-serif border-2 shadow-lg shadow-yellow-200 border-yellow-500">
                            <h2 className="card-title text-5xl mt-10 mb-8 font-bol text-white">{ofr.title}</h2>
                            <p className='text-2xl font-bold'>{ofr.text}</p>
                            <div className="card-actions justify-start">
                            <button className="btn btn-lg w-40 hover:border-warning border-2 shadow-2xl shadow-blue-700 flex justify-center items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
                <p className="absolute">Book Now</p></button>
                            </div>
                        </div>
                    </div>)
            }

        </div>
    );
};

export default Offer;