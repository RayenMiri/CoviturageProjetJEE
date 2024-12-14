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
import Profile from "./Pages/Profile/Profile"
import DriverRidesPage from "./Pages/Rides/DriverRidesPage";
import LandingPage from "./Pages/Landing/LandingPage";
import About from "./Pages/About/About";
import ContactPage from "./Pages/Contact/Contact";
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
                <Route path="/home" element={ <PrivateRoute children={<Home/>}/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/Profile" element={ <PrivateRoute children={<Profile/>}/>}/>
                <Route path="/driverRides" element={ <PrivateRoute children={<DriverRidesPage/>}/> }/>
                <Route path="/landingPage" element={<LandingPage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<ContactPage/>}/>

            </Routes>
        </BrowserRouter>
    <Footer/>

    </div>
);

export default App;
