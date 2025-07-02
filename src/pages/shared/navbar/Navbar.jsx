import React from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import BrandLogo from "../brandLogo/BrandLogo";
import useAuth from "../../../hook/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const link = user ? (
    <>
      <div className="liDiv">
        <NavLink to={"/"}>
          <li className="liSetup">Home</li>
        </NavLink>
        <NavLink to={"/about"}>
          <li className="liSetup">About Us</li>
        </NavLink>
        <NavLink to={"/coverage"}>
          <li className="liSetup">Coverage</li>
        </NavLink>
        <NavLink to={"/addParcel"}>
          <li className="liSetup">Add Parcel</li>
        </NavLink>
        <NavLink to={"/dashBoard"}>
          <li className="liSetup">DashBoard</li>
        </NavLink>
      </div>
    </>
  ) :  (
    <>
      <div className="liDiv">
        <NavLink to={"/"}>
          <li className="liSetup">Home</li>
        </NavLink>
        <NavLink to={"/about"}>
          <li className="liSetup">About Us</li>
        </NavLink>
        <NavLink to={"/coverage"}>
          <li className="liSetup">Coverage</li>
        </NavLink>
      </div>
    </>
  )

  const handleLogOut = () => {
    signOutUser()
      .then((res) => {
        console.log(res, "log out done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="navbar bg-base-100 lg:h-[70px] shadow-sm rounded-2xl max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <div>
          <BrandLogo></BrandLogo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{link}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link
              to={"/"}
             
            >
              <button  onClick={() => {
                handleLogOut();
              }} className="btn bg-[#caeb66]">Log Out</button>
            </Link>
          </>
        ) : (
          <>
           <div className="flex gap-2">
             <Link to={"/login"}>
              <button className="btn">Sign In</button>
            </Link>
            <Link to={"/register"}>
              <button className="btn bg-[#caeb66]">Sign Up</button>
            </Link>
           </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
