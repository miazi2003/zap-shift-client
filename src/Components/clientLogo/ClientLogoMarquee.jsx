import React from 'react';
import Marquee from "react-fast-marquee";
import logo1 from "../../assets/assets/brands/amazon.png"
import logo2 from "../../assets/assets/brands/casio.png"
import logo3 from "../../assets/assets/brands/moonstar.png"
import logo4 from "../../assets/assets/brands/randstad.png"
import logo5 from "../../assets/assets/brands/start-people 1.png"
import logo6 from "../../assets/assets/brands/start.png"
const logos = [logo1 , logo2 , logo3 , logo4 , logo5 , logo6]
console.log(logos)
const ClientLogoMarquee = () => {
    return (
        <div className='flex flex-col gap-4 py-6 px-24'>
            <div className='text-center text-[#03373d] font-bold text-xl'>
                <h1>We've helped thousands of sales teams</h1>
            </div>
            <div className=''>
                <Marquee autoFill={true} pauseOnClick={true}>{logos.map(logo=><><img className='lg:ml-16' src={logo} alt="" /></>)}</Marquee>
            </div>
        </div>
    );
};

export default ClientLogoMarquee;