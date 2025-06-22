import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user , loading} = useAuth()
    if(loading){
        return <><p><span className="loading loading-ring loading-xl"></span></p></>
    }

    if(!user){
        return <Navigate to='/login'></Navigate>
    }



    return children;
};

export default PrivateRoute;