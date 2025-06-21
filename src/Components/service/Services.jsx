import React, { useState } from 'react';
import serviceData from "../../data/services.json";
import ServiceCard from './ServiceCard';

const Services = () => {

const [activeIndex , setActiveIndex] = useState(null)


  return (
    <div className='py-12 px-6 bg-[#03373d] rounded-3xl flex flex-col gap-8 items-center'>
      <h1 className='text-white font-bold text-3xl'>Our Services</h1>
      <p className='w-1/2 mx-auto text-sm text-gray-400 text-center font-semibold'>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
        From personal packages to business shipments — we deliver on time, every time.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-20 w-full'>
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            isActive={ activeIndex === index }
            onClick={()=>{setActiveIndex(index)}}

          />
        ))}
      </div>
    </div>
  );
};

export default Services;
