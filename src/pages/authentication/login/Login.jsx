import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="hero w-full">
      <div className="card-body flex flex-col gap-2 w-1/2">
        <h1 className="text-4xl font-bold">Welcome Home</h1>
        <p>Login With ProFast</p>
        <fieldset className="fieldset w-full">
          <label className="label text-black font-bold">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />
          <label className="label text-black font-bold">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover text-gray-600 text-sm underline">
              Forgot Password?
            </a>
          </div>
          <button className="btn bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] duration-300 mt-4">
            Login
          </button>
          <p className="text-gray-600 text-sm mt-2">
            Don't have Any Account?{" "}
            <a href="/register" className="text-[#caeb90] text-shadow-2xs">
              Register
            </a>
          </p>
          <div className="text-center py-2">OR</div>
          <button className="btn bg-gray-200 text-black border-[#e5e5e5]">
          <FcGoogle size={20} />
            Login with Google
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
