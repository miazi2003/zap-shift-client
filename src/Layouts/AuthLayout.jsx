import React from 'react';
import { Outlet } from 'react-router';
import authImage from "../assets/assets/authImage.png"
import BrandLogo from '../pages/shared/brandLogo/BrandLogo';
const AuthLayout = () => {
    return (
      <div className="hero  min-h-screen bg-white">
  <div className="flex lg:flex-row-reverse w-full">
    <div className=' bg-green-50 h-screen w-1/2 flex items-center justify-center'>
        <img
      src={authImage}
      className=""
    />
    </div>
    <div className='flex flex-col  w-1/2 py-8'>
        <div className='text-2xl  font-bold px-8'><BrandLogo></BrandLogo></div>
        <div className='flex  lg:mt-12 lg:-ml-32 '>
             <Outlet></Outlet>
        </div>
    </div>
  </div>


</div>
    );
};

export default AuthLayout;