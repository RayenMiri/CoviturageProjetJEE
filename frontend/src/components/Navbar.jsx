import logo from "../assests/logo.png"
import { Menu, X } from "lucide-react";
import {useState} from "react";

const Navbar =() =>{
    const [mobileDrawerOpen, setMobileDrawerOpen]=useState(false);
    const toggleNavbar = ()=>{
        setMobileDrawerOpen(!mobileDrawerOpen)
    }
    const navLinks = (
        <ul className="flex flex-col lg:flex-row lg:space-x-12 lg:ml-14 space-y-4 lg:space-y-0 text-center font-semibold">
            <li>
                <a href="#home" className="hover:text-orange-400 ">
                    Home
                </a>
            </li>
            <li>
                <a href="#about" className="hover:text-orange-400">
                    About
                </a>
            </li>
            <li>
                <a href="#contact" className="hover:text-orange-400">
                    Contact
                </a>
            </li>
        </ul>
    );
    return (
        <nav className="sticky.top-0.z-50.py-3.backdrop-blur-lg.border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 mr-0" src={logo} alt="logo"/>
                        <span className="text-2xl tracking-tight">Covy</span>
                    </div>
                    <div className="hidden lg:flex">{navLinks}</div>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <a href="../Auth/sign_in.jsx" className=" bg-blue-600 text-white py-2 px-3 border rounded-md hover:bg-blue-700 transition duration-200 focus:ring-blue-300 font-semibold">Sign In</a>
                        <a href="../Auth/sign_up.jsx"
                           className=" text-white bg-gradient-to-r from-orange-300 to-orange-600 py-2 px-3 rounded-md font-semibold hover:bg-orange-900 transition duration-200 focus:ring-orange-800">Create an account</a>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X/> : <Menu/>}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 w-full bg-gray-200 p-12 flex flex-col items-center lg:hidden font-semibold">
                        <button
                            onClick={toggleNavbar}
                            className="self-end mb-6 text-xl">
                        </button>
                        {navLinks}
                        <div className="flex space-x-6 p-6">
                            <a href="../Auth/sign_in.jsx" className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition duration-200  focus:ring-blue-300 font-semibold">Sign In</a>
                            <a href="../Auth/sign_up.jsx"
                               className="text-xs text-white bg-gradient-to-r from-orange-300 to-orange-600 py-2 px-3 rounded-md font-semibold hover:bg-orange-700 transition duration-200  focus:ring-orange-300" >Create an account</a>
                        </div>
                    </div>
                )}

            </div>
        </nav>

    );
}
export default Navbar;