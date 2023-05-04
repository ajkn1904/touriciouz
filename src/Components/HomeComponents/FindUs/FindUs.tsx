import React from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const FindUs = () => {

    return (
        <div className='my-32 font-serif w-[80vw] mx-auto'>
            <h2 className="text-center font-semibold text-2xl text-green-600 italic">Find Touriciouz____</h2>
            <h1 className="text-3xl font-semibold my-5 text-center">We Create Worth Journeys!</h1>
            <p className="text-lg lg:w-[50vw] mx-auto mt-5 mb-10 text-center">Proactively fabricate one-to-one materials via effective e-business. Completely synergize scalable e-commerce rather than high standards in e-services.</p>
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
    );
};

export default FindUs;