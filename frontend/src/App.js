import React from "react";
import SignIn from "./Pages/Auth/sign_in";
import SignUp from "./Pages/Auth/sign_up";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const App = () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>


            </Routes>

        </BrowserRouter>


    </div>
);

export default App;
