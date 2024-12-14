import logo from "../assests/logo.png";
import { Menu, X, User, LogOut, Car, Home, Info, PhoneCall, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/Slices/authSlice";

const LoggedInLinks = ({ user, handleLogout }) => (
    <>
        <li className="flex items-center gap-2">
            <Home className="h-5 w-5 text-white"/>
            <a href="/Home" className="hover:text-orange-400 transition">Home</a>
        </li>
        <li className="flex items-center gap-2">
            <User className="h-5 w-5 text-white"/>
            <a href="/Profile" className="hover:text-orange-400 transition">Profile</a>
        </li>
        <li className="flex items-center gap-2">
            <Car className="h-5 w-5 text-white"/>
            <a href="/dashboard" className="hover:text-orange-400 transition">My Rides</a>
        </li>
        {user?.role === "RIDER" && (
            <li className="flex items-center gap-2">
                <Car className="h-5 w-5 text-white"/>
                <a href="/driverRides" className="hover:text-orange-400 transition">Booked Rides</a>
            </li>
        )}
        <li>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                <LogOut className="h-5 w-5"/> Logout
            </button>
        </li>

    </>
);

const LoggedOutLinks = () => (
    <>
        <li className="flex items-center gap-2">
            <Home className="h-5 w-5 text-white"/>
            <a href="/landingPage" className="hover:text-orange-400 transition">Home</a>
        </li>
        <li className="flex items-center gap-2">
            <Info className="h-5 w-5 text-white"/>
            <a href="/about" className="hover:text-orange-400 transition">About</a>
        </li>
        <li className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-white"/>
            <a href="/contact" className="hover:text-orange-400 transition">Contact</a>
        </li>
        <li className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-white"/>
            <a href="/signin" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Sign In
            </a>
        </li>
        <li className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-white"/>
            <a href="/signup"
               className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg hover:from-orange-500 hover:to-orange-700 transition">
                Sign Up
            </a>
        </li>

    </>
);

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const {isAuthenticated, user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);
    const handleLogout = () => dispatch(logout());

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-md p-3">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="h-8 w-8" />
                    <span className="text-xl font-bold text-white">WeRide</span>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center space-x-6 text-white font-semibold">

                    {isAuthenticated ? <LoggedInLinks user={user} handleLogout={handleLogout} /> : <LoggedOutLinks />}
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={toggleNavbar} className="lg:hidden text-white">
                    {mobileDrawerOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Responsive Mobile Menu Section */}
            {mobileDrawerOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-blue-800 p-6 flex flex-col space-y-6">
                    <button onClick={toggleNavbar} className="self-end text-white">
                        <X size={28} />
                    </button>
                    <ul className="space-y-4 text-white font-semibold">

                        {isAuthenticated ? <LoggedInLinks user={user} handleLogout={handleLogout} /> : <LoggedOutLinks />}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
