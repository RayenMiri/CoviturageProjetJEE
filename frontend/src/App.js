import React from "react";
import SignIn from "./Pages/Auth/sign_in";
import SignUp from "./Pages/Auth/sign_up";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Pages/Rides/Dashboard";
import RidesMap from "./Pages/Rides/RidesMap";
import AddRideForm from "./Components/AddRideForm";
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home/Home"
import Error from "./Pages/Error/Error"
import Footer from "./Components/Footer"
import PrivateRoute from "./Pages/Auth/PrivateRoute";
const App = () => (
    <div>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/dashboard" element={<PrivateRoute children={<Dashboard/>}/>}/>
                <Route path="/createRide" element={<PrivateRoute children={<AddRideForm/>}/>}/>
                <Route path="/ridesMap" element={ <PrivateRoute children={<RidesMap/>}/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/error" element={<Error/>}/>

            </Routes>
        </BrowserRouter>
    <Footer/>

    </div>
);

export default App;
