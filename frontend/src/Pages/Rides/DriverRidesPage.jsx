import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRidesByDriverId} from "../../Store/Slices/ridesSlice"; // Adjust this path to your project structure

const DriverRidesPage = () => {
    const [totalEarnings, setTotalEarnings] = useState(0);
    const dispatch = useDispatch();
    const { rides, loading, error } = useSelector((state) => state.rides);
    const driverId = JSON.parse(localStorage.getItem("user")).userId;
    useEffect(() => {
        dispatch(fetchRidesByDriverId(driverId));
    }, [dispatch]);

    useEffect(() => {
        if (rides && rides.length > 0) {
            const earnings = rides.reduce(
                (sum, ride) => sum + ride.pricePerSeat * (ride.availableSeats || 0),
                0
            );
            setTotalEarnings(earnings);
        }
    }, [rides]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Rides</h1>

                {/* Earnings Summary */}
                <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mb-6">
                    <span className="text-lg font-semibold text-gray-700">Total Earnings:</span>
                    <span className="text-xl font-bold text-green-600">${totalEarnings.toFixed(2)}</span>
                </div>

                {/* Ride List */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : rides && rides.length > 0 ? (
                    <table className="table-auto w-full bg-white border-collapse border border-gray-200">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Departure</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Destination</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Date & Time</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Seats</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rides.map((ride) => (
                            <tr key={ride.idRide} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{ride.departureLocation}</td>
                                <td className="border border-gray-300 px-4 py-2">{ride.destination}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(ride.departureDateTime).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{ride.availableSeats}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    ${ride.pricePerSeat.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No rides available.</p>
                )}
            </div>
        </div>
    );
};

export default DriverRidesPage;
