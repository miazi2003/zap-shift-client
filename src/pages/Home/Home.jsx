import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "../../Components/how it/HowItWorks";
import Services from "../../Components/service/Services";
import ClientLogoMarquee from "../../Components/clientLogo/ClientLogoMarquee";
import DeliveryService from "../../Components/DelivaryService/DeliveryService";
import Merchant from "../../Components/Merchent/Marchant";
import ReviewComponent from "../../Components/review/ReviewComponent";
import MultiStepForm from "../../Components/multi/MultiStepForm";


const Home = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 mb-4">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <ClientLogoMarquee></ClientLogoMarquee>
      <DeliveryService></DeliveryService>
      <Merchant></Merchant>
      <ReviewComponent></ReviewComponent>
      {/* <MultiStepForm></MultiStepForm> */}






































      
    </div>
  );
};

export default Home;
