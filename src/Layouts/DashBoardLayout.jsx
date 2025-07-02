import React from "react";
import BrandLogo from "../pages/shared/brandLogo/BrandLogo";
import { NavLink, Outlet } from "react-router";

const DashBoardLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col ">
            
            {/* Navbar */}
  {/* Navbar */}
    <div className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">DashBoard</div>
    
    </div>
    {/* Page content here */}
    <Outlet>

    </Outlet>

          </div>
          <div className="drawer-side border">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-70 p-4">
              {/* Sidebar content here */}
              <li>
                <BrandLogo/>
              </li>
              <li>
               <a href="/dashBoard">Overview</a>
              </li>
              <li>
                <NavLink to={"/dashBoard/myParcels"}>My Parcels</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
