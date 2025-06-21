import React from "react";
import logo from "../../../assets/assets/logo.png";
const BrandLogo = () => {
  return (
    <div>
      <div className="flex items-end">
        <img className=" h-8 rounded-2xl mb-1" src={logo} alt="" />
        <h1 className="text-xl -ml-2 font-bold">ProFast</h1>
      </div>
    </div>
  );
};

export default BrandLogo;
