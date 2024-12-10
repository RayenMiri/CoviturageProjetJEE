import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRidesByDriverId } from "../../Store/Slices/ridesSlice";
import { fetchReservationByRideId } from "../../Store/Slices/reservationSlice";

const DriverRidesPage = () => {
    const [totalEarnings, setTotalEarnings] = useState(0);
    const dispatch = useDispatch();
    const { rides, loading: ridesLoading, error: ridesError } = useSelector((state) => state.rides);
    const { reservations, loading: reservationsLoading, error: reservationsError } = useSelector((state) => state.reservations);
    const driverId = JSON.parse(localStorage.getItem("user")).userId;

    useEffect(() => {
        dispatch(fetchRidesByDriverId(driverId));
    }, [dispatch, driverId]);

    useEffect(() => {
        if (rides.length > 0) {
            rides.forEach((ride) => {
                dispatch(fetchReservationByRideId(ride.idRide));
            });
        }
    }, [rides, dispatch]);

    useEffect(() => {
        let earnings = 0;
        reservations.forEach((reservation) => {
            earnings += reservation.nbOfSeats * reservation.ride.pricePerSeat;
        });
        setTotalEarnings(earnings);
    }, [reservations]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Reserved Rides</h1>

                {/* Earnings Summary */}
                <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mb-6">
                    <span className="text-lg font-semibold text-gray-700">Total Earnings:</span>
                    <span className="text-xl font-bold text-green-600">{totalEarnings.toFixed(2)} DT</span>
                </div>

                {/* Ride List */}
                {ridesLoading || reservationsLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : ridesError || reservationsError ? (
                    <p className="text-center text-red-500">Error: {ridesError || reservationsError}</p>
                ) : reservations && reservations.length > 0 ? (
                    <table className="table-auto min-w-full bg-white border-collapse border border-gray-200">
                        <thead>
                        <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Reservation ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Passenger Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Passenger email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Ride Details</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Seats Reserved</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservations
                            .filter(
                                (reservation) =>
                                    reservation.status === "confirmed" || reservation.status === "COMPLETED"
                            )
                            .map((reservation) => (
                                <tr key={reservation.id} className="hover:bg-gray-100">
                                    <td className="border-gray-300 px-4 py-2">{reservation.idReservation}</td>
                                    <td className="border-gray-300 px-4 py-2">
                                        {reservation.user.username}
                                    </td>
                                    <td className="border-gray-300 px-4 py-2">
                                        {reservation.user.email}
                                    </td>
                                    <td className="border-gray-300 px-4 py-2">
                                        {reservation.ride.departureLocation} to {reservation.ride.destination} on {new Date(reservation.ride.departureDateTime).toLocaleString()}
                                    </td>
                                    <td className="border-gray-300 px-4 py-2 text-center">{reservation.nbOfSeats}</td>
                                    <td className="border-gray-300 px-4 py-2 text-right">
                                        {(reservation.nbOfSeats * reservation.ride.pricePerSeat).toFixed(2)} DT
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No reservations available.</p>
                )}
            </div>
        </div>
    );
};

export default DriverRidesPage;
