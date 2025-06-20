import React from "react";
import deliveryCar from "../../assets/assets/bookingIcon.png";
const HowItWorks = () => {
  const items = [
    {
      logo: deliveryCar,
      header: "Booking Pick & Drop",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      logo: deliveryCar,
      header: "Cash On Delivery",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      logo: deliveryCar,
      header: "Booking SME & Corporate",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      logo: deliveryCar,
      header: "Delivery Hub",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  console.log(items);
  return (
    <>
    <div className="px-24 ">
      <h1 className="text-2xl font-bold text-[#03373d]">How It Works</h1>
    </div>
      <div className="flex gap-12 px-24 "> 
        {
          items.map(item=> 
            <div className="p-6 bg-white rounded-2xl flex flex-col gap-4">
              <img className="h-10 w-10" src={item.logo} alt="" />
              <h1 className="font-bold text-[#03373d]">{item.header}</h1>
              <p className="text-sm font-semibold text-gray-600">{item.paragraph}</p>
            </div>
          )
        }
      </div>
    </>
  );
};

export default HowItWorks;
