import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { MdUnsubscribe } from 'react-icons/md';

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null)

    const [loading , setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()



    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth , googleProvider)
    }

    const createUser = (email , password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }

    const signInUser = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email ,password)
    }
    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }


    useEffect(()=>{
         const unSubscribe = onAuthStateChanged(auth , currentUser =>{
            setUser(currentUser)
            console.log("user in auth" , currentUser)
            setLoading(false)
            
         })

         return ()=>{
            unSubscribe();
         }



    },[])
const authInfo = {
createUser,
signInUser,
user,
signOutUser,
loading,
googleLogin
}













    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;