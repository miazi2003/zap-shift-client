import React from 'react';
import DeliveryServiceCard from './DeliveryServiceCard';

const DeliveryService = () => {

    const serviceData = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
  }
];

console.log(serviceData)
    return (
        <div className='px-24'>
            <div className='grid grid-rows-3 gap-6 '>
                {
                    serviceData.map(service=><DeliveryServiceCard service={service}></DeliveryServiceCard>)
                }
            </div>

            <div className="border border-dashed max-w-7xl my-12 border-[#03373d]"></div>
        </div>
    );
};

export default DeliveryService;