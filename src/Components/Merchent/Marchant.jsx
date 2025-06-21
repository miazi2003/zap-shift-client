import React from "react";
import logo from "../../assets/assets/location-merchant.png";
import logoMain from "../../assets/assets/be-a-merchant-bg.png";
const Merchant = () => {
  return (
    <div className="w-full px-24 ">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className=" bg-[#03373d]  rounded-2xl px-8 relative "
      >
        <div>
          <img className="absolute" src={logoMain} alt="" />
        </div>
        <div className="flex lg:pb-10 items-center">
          <div className="flex flex-col gap-4 pt-12">
            <h1 className=" text-3xl text-white  font-bold break-words">
              Merchant and Customer Satisfaction <br /> is Our First Priority
            </h1>
            <p className="break-words text-sm text-gray-400 w-2/3">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#caeb66] hover:bg-transparent hover:text-[#caeb66] text-[#03373d] btn rounded-full">
                Become a Merchant
              </button>
              <button className="btn border-[#caeb66] shadow-0 rounded-full hover:duration-300 bg-transparent text-[#caeb66] hover:bg-[#caeb66] hover:text-[#03373d]">
                earn With ProFast Courier
              </button>
            </div>
          </div>

          <div>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
