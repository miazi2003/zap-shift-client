import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hook/useAuth';

const Register = () => {
    const {register , handleSubmit , formState : {errors}} = useForm()
    const {createUser , googleLogin} = useAuth()

    const onSubmit = data =>{
        console.log(data)
        createUser(data.email , data.password).then(res=>{console.log(res.user)}).catch(err=>{console.log(err.message)})
    }


    const handleGoogleSignIn = () =>{
        googleLogin().then(res=>{console.log(res.user)}).catch(err=>{console.log(err.message)})
    }
    return (
       <div className="hero w-full">
            <div className="card-body flex flex-col gap-2 w-1/2">
              <h1 className="text-4xl font-bold">Create An Account</h1>
              <p>Register With ProFast</p>

              <div className='h-10 w-10 rounded-full border'></div>
             <form action="" onSubmit={handleSubmit(onSubmit)}>
               <fieldset className="fieldset w-full">

                <label className="label text-black font-bold">Name</label>
                <input type="text" {...register('name')} className="input w-full" placeholder="Name" />

                <label className="label text-black font-bold">Email</label>
                <input type="email" {...register('email' , {required : true})} className="input w-full" placeholder="Email" />
                {errors.password ?.type === "required" && <p className="text-red-900">Email needed</p>}

                <label className="label  text-black font-bold">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  {...register('password' , {required : true , minLength : 6})}
                  placeholder="Password"
                />
              {errors.password ?.type === "required" && <p className="text-red-900">password needed</p>}
              {errors.password ?.type === "minLength" && <p  className="text-red-900">6  needed</p>}
               
                <button type="submit" className="btn bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] duration-300 mt-4">
                  Login
                </button>
                <p className="text-gray-600 text-sm mt-2">
                  AlReady Have An Account?{" "}
                  <a href="/register" className="text-[#caeb90] text-shadow-2xs">
                    Login
                  </a>
                </p>
               
              </fieldset>
               
             </form>
             <div className="text-center py-2">OR</div>
                <button className="btn w-full bg-gray-200 text-black border-[#e5e5e5]" onClick={()=>{handleGoogleSignIn()}}>
                <FcGoogle size={20} />
                  Register with Google
                </button>
            </div>
          </div>
    );
};

export default Register;