import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/navbar/Navbar';
import Footer from '../pages/shared/Footer';

const MainLayOut = () => {
    return (
        <div className=' mx-auto  gap-2 flex flex-col bg-base-200'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-294px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;