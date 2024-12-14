import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRides } from '../../Store/Slices/ridesSlice';
import { createReservation, fetchReservationByUserId, cancelReservation } from '../../Store/Slices/reservationSlice';
import {createReview, getReviewByIdRide} from '../../Store/Slices/ReviewSlice';
import { Link } from "react-router-dom";
import Modal from '../../Components/Modal';
import { getCurrentTime } from '../../Utils/getCurrentTimeUtil';

const Home = () => {
    const dispatch = useDispatch();
    const { rides, loading, error } = useSelector((state) => state.rides);
    const { reservations } = useSelector((state) => state.reservations);
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user?.userId;

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [isReviewModalVisible, setReviewModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {reviews , loadingRev , errorRev} = useSelector((state)=>state.reviews);
    const onConfirm = (reservationDetails) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        dispatch(createReservation(reservationDetails)).finally(() => {
            setIsSubmitting(false);
            setModalVisible(false);
        });
    };

    useEffect(() => {
        if (userID) {
            dispatch(fetchRides());
            dispatch(fetchReservationByUserId(userID));
        }
    }, [dispatch, userID]);

    const handleReserveClick = (ride) => {
        setSelectedRide(ride);
        setModalVisible(true);
    };

    const handleCancelClick = (ride) => {

        reservations.forEach((reservation) => {
            console.log("Reservation Details:");
            console.log("  - Reservation ID:", reservation.idReservation);
            console.log("  - Ride ID:", reservation.ride?.idRide);
            console.log("  - User ID:", reservation.user?.id);
        });

        const reservationToCancel = reservations.find((reservation) => {
            const rideMatch = reservation.ride?.idRide === ride.idRide;
            const userMatch = String(reservation.user?.id) === String(userID); // Convert both to strings
            return rideMatch && userMatch;
        });


        if (reservationToCancel) {
            dispatch(
                cancelReservation({
                    idRide: reservationToCancel.ride?.idRide,
                    idUser: reservationToCancel.user?.id
                })
            );

        } else {
            alert("No reservation found for this ride.");
        }
    };

    const handleReviewClick = (ride) => {
        setSelectedRide(ride);
        setReviewModalVisible(true);
    };

    const submitReview = () => {
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }

        const review = {
            rating,
            ride: { idRide: selectedRide.idRide },
            user: { id: userID },
        };

        dispatch(createReview(review)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                setReviewModalVisible(false);
                alert("Review Submitted Successfully");
            }
        });
    };

    const isBooked = (idRide) => {
        return reservations.some(
            (reservation) => reservation.ride.idRide === idRide && reservation.status === "confirmed"
        );
    };


    return (
        <div className="homepage">
            {loading && <p>Loading rides...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && rides.length === 0 && <p>No rides available.</p>}

            <div className="rides-list flex flex-wrap justify-center column-gap-5 row-gap-5">
                {rides.map((ride) => (
                    ride.availableSeats > 0 && (
                        <div
                            key={ride.idRide}
                            className="bg-white flex justify-center items-center w-full sm:w-11/12 md:w-6/12 lg:w-4/12 p-3"
                        >
                            <div
                                className="flex flex-col items-center justify-between bg-white dark:bg-gray-800 shadow-md text-gray-800 border border-gray-200 w-full h-auto rounded-xl"
                            >
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center px-6">
                                        <img
                                            className="w-16 rounded-full ring-2 ring-green-600 shadow-lg m-2"
                                            src='https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg'
                                            alt="User Avatar"
                                        />
                                        <div className="text-left">
                                            <h4 className="text-lg uppercase text-red-500">{ride.title}</h4>
                                            <h4 className="text-sm font-medium dark:text-gray-200">
                                                {ride.departureLocation} to {ride.destination}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="text-right p-2">
                                        <p className="text-sm text-gray-800 dark:text-gray-200">{ride.date}</p>
                                    </div>
                                </div>
                                <div className="text-left p-2">
                                    <h3 className="text-base text-green-400 font-semibold">Details</h3>
                                    <ul className="text-sm list-disc">
                                        <li><span className="font-bold">Departure Location:</span> {ride.departureLocation}</li>
                                        <li><span className="font-bold">Destination:</span> {ride.destination}</li>
                                        <li><span className="font-bold">Available Seats:</span> {ride.availableSeats}</li>
                                        <li><span className="font-bold">Price Per Seat:</span> {ride.pricePerSeat}</li>
                                        <li><span className="font-bold">Restrictions:</span> {ride.restrictions}</li>
                                    </ul>
                                    <div className="flex justify-end space-x-4">
                                        {isBooked(ride.idRide) ? (
                                            <>
                                                <button
                                                    onClick={() => handleReviewClick(ride)}
                                                    className="bg-yellow-500 text-white rounded-md px-4 py-2"
                                                >
                                                    Review
                                                </button>
                                                <button
                                                    onClick={() => handleCancelClick(ride)}
                                                    className="bg-red-600 text-white rounded-md px-4 py-2"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleReserveClick(ride)}
                                                className="bg-indigo-600 text-white rounded-md px-4 py-2"
                                            >
                                                Reserve
                                            </button>
                                        )}
                                        <button className="bg-green-600 text-white rounded-md px-4 py-2">
                                            <Link to="/ridesMap" className="text-white no-underline">View in Map</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Modal
                        isVisible={isModalVisible}
                        ride={selectedRide} // Pass the selected ride to the Modal
                        user={user}         // Pass the logged-in user to the Modal
                        onClose={() => setModalVisible(false)} // Close modal handler
                        onConfirm={onConfirm}/>
                    <button onClick={() => setModalVisible(false)}
                            className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 hover:bg-red-600">X</button>
                </div>
            )}


            {isReviewModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Rate the Ride</h3>
                        <div className="flex justify-center space-x-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={submitReview}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                        >
                            Submit Review
                        </button>
                        <button
                            onClick={() => setReviewModalVisible(false)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-md ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
