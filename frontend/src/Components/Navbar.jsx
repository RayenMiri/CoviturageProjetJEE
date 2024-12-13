import logo from "../assests/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/Slices/authSlice";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    const loggedInLinks = (
        <>
            <li>
                <a href="/Profile" className="hover:text-orange-400 no-underline">
                    Profile
                </a>
            </li>
            <li>
                <a href="/dashboard" className="hover:text-orange-400 no-underline">
                    Rides
                </a>
            </li>
            {
                // Check if user is not null and has the "RIDER" role
                user?.role === "RIDER" && (
                    <li>
                        <a href="/driverRides" className="hover:text-orange-400 no-underline">
                            Booked Rides
                        </a>
                    </li>
                )
            }
            <li>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-red-700 transition duration-200">
                    Logout
                </button>
            </li>
        </>
    );

    const loggedOutLinks = (
        <>
            <li>
                <a href="/signin"
                   className="bg-blue-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 no-underline">
                    Sign In
                </a>
            </li>
            <li>
                <a href="/signup"
                   className="text-white bg-gradient-to-r from-orange-300 to-orange-600 py-2 px-3 rounded-md font-semibold hover:bg-orange-700 transition duration-200 no-underline">
                    Create an account
                </a>
            </li>
            <li>
                <a href="#about" className="hover:text-orange-400 no-underline">
                    About
                </a>
            </li>
            <li>
                <a href="#contact" className="hover:text-orange-400 no-underline">
                    Contact
                </a>
            </li>
        </>
    );

    const navLinks = (
        <ul className="flex flex-col lg:flex-row lg:space-x-12 lg:ml-14 space-y-4 lg:space-y-0 text-center font-semibold p-2 m-1">
            <li>
                <a href="/Home" className="hover:text-orange-400 no-underline">
                    Home
                </a>
            </li>

            {isAuthenticated ? loggedInLinks : loggedOutLinks}
        </ul>
    );

    return (
        <nav className="sticky z-50 py-3 backdrop-blur-lg border-neutral-700/80 p-2 border-b">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 mr-0" src={logo} alt="logo" />
                        <span className="text-2xl tracking-tight">Covy</span>
                    </div>
                    <div className="hidden lg:flex">{navLinks}</div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu />}
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
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
