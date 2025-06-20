import React from 'react';
import {  NavLink } from 'react-router';
import './Navbar.css'
import BrandLogo from '../brandLogo/BrandLogo';

const Navbar = () => {
    const link = (
        <>
     <div className='liDiv'> 
         <NavLink to={'/'}><li className='liSetup'>Home</li></NavLink>
        <NavLink to={'/about'}><li className='liSetup'>About Us</li></NavLink>
     </div>
        </>
    )
    return (
      <div className="navbar bg-base-100 lg:h-[70px] shadow-sm rounded-2xl max-w-7xl mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {link}
      </ul>
    </div>
<div>
<BrandLogo></BrandLogo>
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-medium">
      {link}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
    );
};

export default Navbar;