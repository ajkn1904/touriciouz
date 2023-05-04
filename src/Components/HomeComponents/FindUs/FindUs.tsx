import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import initAOS from '../../../../aos';


const FindUs = () => {

    useEffect(() => {
        initAOS();
    }, []);

    return (
        <div className='my-32 font-serif w-[80vw] mx-auto'>
            <h2 className="text-center font-semibold text-2xl text-green-600 italic" data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false" >Find Touriciouz____</h2>
            <h1 className="text-3xl font-semibold my-5 text-center" data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">We Create Worth Journeys!</h1>
            <p className="text-lg lg:w-[50vw] mx-auto mt-5 mb-10 text-center" data-aos="fade-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">Proactively fabricate one-to-one materials via effective e-business. Completely synergize scalable e-commerce rather than high standards in e-services.</p>
            <div data-aos="flip-up" data-aos-offset="10" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false">
                <MapContainer className='w-[80vw] h-[500px] mx-auto -z-10' center={[22.351854101271293, 91.83387696110066]} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[22.351854101271293, 91.83387696110066]}>
                        <Popup minWidth={90}>
                            Chittagong
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default FindUs;