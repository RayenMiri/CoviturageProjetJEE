import React from "react";
import SignIn from "./Auth/sign_in";
import SignUp from "./Auth/sign_up";
import Navbar from "./components/Navbar"

const App = () => (
    <div>
        <Navbar />
        <SignUp/>
    </div>
);

export default App;
