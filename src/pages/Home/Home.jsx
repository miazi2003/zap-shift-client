import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from '../../Components/how it/HowItWorks';
import Services from '../../Components/service/Services';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col gap-12 mb-4'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
        </div>
    );
};

export default Home;