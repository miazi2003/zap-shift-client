import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layouts/MainLayOut";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
 {
    path : '/' ,
    Component:MainLayOut,
    errorElement : <><p>Error</p></> ,
    children  : [
        {index : true , Component : Home},
        {}
    ]
 }

])
