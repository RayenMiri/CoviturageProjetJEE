import React from "react";
import RidesDisplay from "../../Components/RidesDisplay";
import AddRideForm from "../../Components/AddRideForm";
import {Link, useNavigate} from "react-router-dom";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.userId;
    const userRole = user.role;

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1
                className="text-3xl font-bold text-center text-blue-600"
            >
                Dashboard
            </h1>
            <button
                onClick={() => {
                    navigate("/ridesMap")
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300 font-semibold"
            >
                view in map
            </button>
            <RidesDisplay userID={userID} userRole={userRole}/>
            {userRole === "RIDER" &&(
                <AddRideForm userID={userID}/>
            )}
        </div>
    );
};

export default Dashboard;
