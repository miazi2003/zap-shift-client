import React from 'react';
import logoDelivery from "../../assets/assets/safe-delivery.png"
const DeliveryServiceCard = ({service}) => {
    console.log(service)
    return (
        <div className='flex gap-8  py-6 bg-white shadow px-6 rounded-3xl flex-1 items-center'>
            <div data-aos="fade-right" data-aos-duration="3000">
        <img className='h-36 w-36' src={logoDelivery} alt="" />
            </div>
            <div className='border border-dashed h-36 border-[#03373d50] w-0 '>

            </div>
            <div data-aos="fade-left" data-aos-duration="3000" className='flex-1 flex flex-col gap-4'>
        <h1 className='text-xl font-bold text-[#03373d]'>{service.title}</h1>
        <p className='text-sm text-gray-600 font-semibold break-words'>{service.description}</p>
            </div>
        </div>
    );
};

export default DeliveryServiceCard;