import React from "react";
import SignIn from "./Pages/Auth/sign_in";
import SignUp from "./Pages/Auth/sign_up";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Pages/Rides/Dashboard";
import RidesMap from "./Pages/Rides/RidesMap";
import AddRideForm from "./Components/AddRideForm";
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Error from "./Components/Error"
import Footer from "./Components/Footer"
import Profile from "./Components/Profile"
const App = () => (
    <div>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/createRide" element={<AddRideForm/>}/>
                <Route path="/ridesMap" element={<RidesMap/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    <Footer/>

    </div>
);

export default App;
