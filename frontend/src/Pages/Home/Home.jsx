import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRides } from '../../Store/Slices/ridesSlice';
import { createReservation, fetchReservationByUserId, cancelReservation } from '../../Store/Slices/reservationSlice';
import { createReview } from '../../Store/Slices/ReviewSlice';
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
    const { reviews, loadingRev, errorRev } = useSelector((state) => state.reviews);

    // Filter state
    const [departureLocation, setDepartureLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

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

    // Filter function
    const filteredRides = rides.filter((ride) => {
        const matchesDeparture = ride.departureLocation.toLowerCase().includes(departureLocation.toLowerCase());
        const matchesDestination = ride.destination.toLowerCase().includes(destination.toLowerCase());
        const matchesPrice = (minPrice ? ride.pricePerSeat >= minPrice : true) && (maxPrice ? ride.pricePerSeat <= maxPrice : true);

        return matchesDeparture && matchesDestination && matchesPrice;
    });

    return (
        <div className="homepage">
            {loading && <p>Loading rides...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && filteredRides.length === 0 && <p>No rides available.</p>}

            {/* Search Filters */}
            <div className="filters p-4">
                <input
                    type="text"
                    placeholder="Departure Location"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="p-2 border rounded ml-2"
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="p-2 border rounded ml-2"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="p-2 border rounded ml-2"
                />
            </div>

            <div className="rides-list flex flex-wrap justify-center column-gap-5 row-gap-5">
                {filteredRides.map((ride) => (
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <Modal
                        selectedRide={selectedRide}
                        onConfirm={onConfirm}
                        onCancel={() => setModalVisible(false)}
                    />
                </div>
            )}

            {isReviewModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <Modal
                        selectedRide={selectedRide}
                        onConfirm={submitReview}
                        onCancel={() => setReviewModalVisible(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
