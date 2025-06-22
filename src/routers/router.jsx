import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layouts/MainLayOut";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/login/Register";
import Coverage from "../pages/covarage/Coverage";

export const router = createBrowserRouter([
 {
    path : '/' ,
    Component:MainLayOut,
    errorElement : <><p>Error</p></> ,
    children  : [
        {index : true , Component : Home},
        {path : "/coverage" , Component : Coverage}
    ]
 },
 {
    path : "/",
    Component : AuthLayout,
    children : [
        {path : "/login" , Component : Login},
        {path : "/register" , Component : Register},
    ]
 }

])
