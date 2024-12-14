import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRidesByDriverId } from "../../Store/Slices/ridesSlice";
import { fetchReservationByRideId } from "../../Store/Slices/reservationSlice";
import { getReviewByIdRide } from "../../Store/Slices/ReviewSlice";

const DriverRidesPage = () => {
    const [totalEarnings, setTotalEarnings] = useState(0);
    const dispatch = useDispatch();
    const { rides, loading: ridesLoading, error: ridesError } = useSelector((state) => state.rides);
    const { reservations, loading: reservationsLoading, error: reservationsError } = useSelector((state) => state.reservations);
    const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector((state) => state.reviews);
    const driverId = JSON.parse(localStorage.getItem("user")).userId;
    const [revAv , setRevAv] = useState(0);

    useEffect(() => {
        dispatch(fetchRidesByDriverId(driverId));
    }, [dispatch, driverId]);

    useEffect(() => {
        if (rides.length > 0) {
            rides.forEach((ride) => {
                dispatch(fetchReservationByRideId(ride.idRide));
                dispatch(getReviewByIdRide(ride.idRide));
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

    useEffect(() => {
        let sumRev = 0;
        reviews.forEach((review) => {
            sumRev += review.rating;
        });
        setRevAv(sumRev / reviews.length);
    }, [reviews]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Reserved Rides</h1>

                {/* Earnings Summary */}
                <div className="flex justify-between items-center bg-gray-200 p-5 rounded-lg mb-6 shadow-md">
                    <span className="text-xl font-semibold text-gray-700">Total Earnings:</span>
                    <span className="text-2xl font-bold text-green-600">{totalEarnings.toFixed(2)} DT</span>
                </div>

                {/* Average Reviews */}
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-5 mb-6 shadow-md">
                    <h2 className="text-xl font-semibold text-blue-800 mb-3">Average Rating</h2>
                    <div className="flex items-center">
                        <div className="flex items-center mr-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-8 h-8 ${
                                        star <= Math.round(revAv) ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-4xl font-semibold text-blue-700">{revAv.toFixed(1)}</span>
                        <span className="text-gray-600 ml-3">
                            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                </div>

                {/* Ride List */}
                {ridesLoading || reservationsLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : ridesError || reservationsError ? (
                    <p className="text-center text-red-500">Error: {ridesError || reservationsError}</p>
                ) : reservations && reservations.length > 0 ? (
                    <table className="table-auto min-w-full bg-white border-collapse border border-gray-300 shadow-md">
                        <thead>
                        <tr className="bg-gray-300">
                            <th className="border border-gray-400 px-6 py-3 text-left text-gray-700">Reservation ID</th>
                            <th className="border border-gray-400 px-6 py-3 text-left text-gray-700">Passenger Name</th>
                            <th className="border border-gray-400 px-6 py-3 text-left text-gray-700">Passenger email</th>
                            <th className="border border-gray-400 px-6 py-3 text-left text-gray-700">Ride Details</th>
                            <th className="border border-gray-400 px-6 py-3 text-left text-gray-700">Seats Reserved</th>
                            <th className="border border-gray-400 px-6 py-3 text-left text-gray-700">Price</th>
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
                                    <td className="border-gray-400 px-6 py-4">{reservation.idReservation}</td>
                                    <td className="border-gray-400 px-6 py-4">{reservation.user.username}</td>
                                    <td className="border-gray-400 px-6 py-4">{reservation.user.email}</td>
                                    <td className="border-gray-400 px-6 py-4">
                                        {reservation.ride.departureLocation} to {reservation.ride.destination} on{" "}
                                        {new Date(reservation.ride.departureDateTime).toLocaleString()}
                                    </td>
                                    <td className="border-gray-400 px-6 py-4 text-center">{reservation.nbOfSeats}</td>
                                    <td className="border-gray-400 px-6 py-4 text-right">
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
