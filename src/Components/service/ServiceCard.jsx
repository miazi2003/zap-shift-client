import React from 'react';
import serviceLogo from "../../assets/assets/service.png";

const ServiceCard = ({ service, isActive, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className={`rounded-2xl flex flex-col gap-4 p-8 h-60 text-center items-center transition-all duration-300 
        ${isActive ? 'bg-[#caeb66]' : 'bg-white'}`}>
        <img className="h-10 w-10" src={serviceLogo} alt="service logo" />
        <h1 className="font-bold text-[#03373d] text-xl">{service.title}</h1>
        <p className="text-sm font-semibold text-gray-600">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
