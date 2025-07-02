import React from 'react';
import errorLogo from "../../assets/assets/errorAll.jpg"
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/Footer';
import { Link } from 'react-router';
const ErrorPage = () => {
    return (
        <div className='bg-base-200'>
            <Navbar></Navbar>
            <div className='flex flex-col items-center justify-center bg-white my-4 py-4 shadow max-w-7xl mx-auto rounded-3xl'>
                <img className='h-100' src={errorLogo} alt="" />
               <Link to={"/"}> <button className='btn bg-[#caeb66] text-sm font-bold'>Go Home</button></Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;