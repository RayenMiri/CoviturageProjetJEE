import React from "react";
import SignIn from "./Pages/Auth/sign_in";
import SignUp from "./Pages/Auth/sign_up";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Pages/Rides/Dashboard";
import RidesMap from "./Pages/Rides/RidesMap";
import AddRideForm from "./Components/AddRideForm";


const App = () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/createRide" element={<AddRideForm/>}/>
                <Route path="/ridesMap" element={<RidesMap/>}/>
            </Routes>
        </BrowserRouter>


    </div>
);

export default App;
