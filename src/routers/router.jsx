import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layouts/MainLayOut";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/login/Register";
import Coverage from "../pages/covarage/Coverage";
import ErrorPage from "../pages/error/ErrorPage";
import AddParcel from "../pages/Add Parcel/AddParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import PrivateRoute from "./PrivateRoute";
import MyParcel from "../pages/my parcel/MyParcel";

export const router = createBrowserRouter([
 {
    path : '/' ,
    Component:MainLayOut,
    errorElement : <ErrorPage></ErrorPage> ,
    children  : [
        {index : true , Component : Home},
        {path : "/coverage" , Component : Coverage},
        {path : "/addParcel" , Component : AddParcel}
    ]
 },
 {
    path : "/",
    Component : AuthLayout,
    errorElement : <ErrorPage></ErrorPage>,
    children : [
        {path : "/login" , Component : Login},
        {path : "/register" , Component : Register},
    ]
 },
 {
    path:"/dashBoard" , 
   element :<PrivateRoute><DashBoardLayout></DashBoardLayout> </PrivateRoute>,
   children : [
    {
        path : "myParcels" , Component : MyParcel
    }
   ]
 }

])
