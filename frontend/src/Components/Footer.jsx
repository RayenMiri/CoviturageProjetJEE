import React from 'react';
import logo from "../assests/logo.png"
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 flex items-center">
                        <img src={logo} alt="WeRide Logo" width="40" height="40"/>
                        <span className="ml-2 text-xl font-bold">WeRide</span>
                    </div>
                    <div className="flex space-x-4">
                        <a href="/about" className="hover:text-blue-400 no-underline text-cyan-50 font-medium">About</a>
                        <a href="/contact" className="hover:text-blue-400 no-underline text-cyan-50 font-medium">Contact</a>
                        <a href="/privacy" className="hover:text-blue-400 no-underline text-cyan-50 font-medium">Privacy Policy</a>
                        <a href="/terms" className="hover:text-blue-400 no-underline text-cyan-50 font-medium">Terms of Service</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm">
                    © {new Date().getFullYear()} WeRide. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
export default Footer;