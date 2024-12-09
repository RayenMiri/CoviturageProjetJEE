import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRides } from '../../Store/Slices/ridesSlice';
import { createReservation,fetchReservationById, cancelReservation  } from '../../Store/Slices/reservationSlice';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from "../../Components/Modal"
import {getCurrentTime} from "../../Utils/getCurrentTimeUtil";
const Home =()=>{
    const dispatch = useDispatch();
    // Access rides, loading, and error states from the Redux store
    const { rides, loading, error } = useSelector((state) => state.rides);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const { reservation = []} = useSelector((state) => state.reservation);
    // Fetch rides when the component mounts
    const [newReservation, setNewReservation] = useState({
        idRide: "",
        idUser: "",
        nbOfSeats: 1,// Default to 1 seat
        createdAt: getCurrentTime(),
        updatedAt: getCurrentTime(),
    })
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.userId;
    const navigate = useNavigate();
    useEffect(() => {
        if (userID) {
            dispatch(fetchRides());
            dispatch(fetchReservationById(userID));
        }
    }, [dispatch, userID]);
    if (!user || user.role !== "PASSENGER") {
        navigate('/error');
        return null;}
    const handleReserveClick = (ride) => {
        console.log("Ride Details:", JSON.stringify(ride)); // Debug log
        setSelectedRide(ride);
        setNewReservation((prev) =>({
            ...prev,
            idRide: ride.idRide, // Ensure idRide exists on ride
            idUser: userID,     // Set idUser from the user object
        }));
        setModalVisible(true);
    };

    const handleCancelClick = (reservation) => {
        console.log("Reservation Details:", JSON.stringify(reservation)); // Debug log
        setSelectedReservation(reservation); // Set the selected reservation
        dispatch(cancelReservation(reservation.idReservation)) // Dispatch the cancellation action
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    console.log("Reservation canceled successfully:", response.payload);
                } else {
                    console.error("Failed to cancel reservation:", response.payload);
                }
            });
    };
    return (
        <div className="homepage">
            {loading && <p>Loading rides...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && rides.length === 0 && <p>No rides available.</p>}
            <div className="rides-list flex flex-wrap justify-center column-gap-5 row-gap-5">
                {rides.map((ride) => (

                    <div key={ride.idRide}
                         className="bg-white flex justify-center items-center w-full sm:w-11/12 md:w-6/12 lg:w-4/12 p-3">
                        <div
                            className='flex flex-col items-center justify-between bg-white dark:bg-gray-800 shadow-md shadow-gray-300 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 w-full h-auto rounded-xl transition-all ease-in-out duration-500'>
                            <div className='w-full flex items-center justify-between'>
                                <div className='flex items-center justify-center px-2 md:px-6'>
                                    <a href={`/Profile/${ride.userId}`}
                                       className="flex items-center justify-center px-2 md:px-6">
                                        <img
                                            className='w-16 hidden rounded-full ring-2 ring-green-600 shadow-lg shadow-green-600 m-2 md:block'
                                            src='https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg' alt="User Avatar"/></a>
                                    <div className='text-left'>
                                        <h4 className='text-lg md:text-2xl lg:text-3xl ease-in-out duration-1000 uppercase'>
                                            <span className='text-red-500'>{ride.title}</span>
                                        </h4>
                                        <h4 className='text-sm md:text-base font-medium dark:text-gray-200'>{ride.departureLocation} to {ride.destination}</h4>
                                    </div>
                                </div>
                                <div className='text-sm md:text-base text-right p-2 gap-4 ease-in-out duration-500'>
                                    <p className='text-sm md:text-base text-gray-800 dark:text-gray-200'>{ride.date}</p>
                                </div>
                            </div>
                            <div className='text-left p-2'>
                                <h3 className='text-base text-green-400 font-semibold'>Details</h3>
                                <ul className='text-sm list-disc ml-0 "'>
                                    <li className="mb-2"><span
                                        className="font-bold">Departure Location:</span> {ride.departureLocation}</li>
                                    <li className="mb-2"><span
                                        className="font-bold">Destination:</span> {ride.destination}</li>
                                    <li className="mb-2"><span
                                        className="font-bold">Available Seats:</span> {ride.availableSeats}</li>
                                    <li className="mb-2"><span
                                        className="font-bold">Price Per Seat:</span> {ride.pricePerSeat}</li>
                                    <li className="mb-2"><span className="font-bold">Restrictions:</span> {ride.restrictions}</li>
                                    <li className="mb-2"><span
                                        className="font-bold">Date:</span> {new Date(ride.departureDateTime).toLocaleDateString()}</li>
                                    <li className="mb-2"><span
                                        className="font-bold">Time:</span> {new Date(ride.departureDateTime).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</li>
                                </ul>
                                <div className="flex justify-end space-x-4">


                                    <button
                                        onClick={() => handleReserveClick(ride)} // Open the modal
                                        className="sm:w-auto lg:w-auto my-2 border rounded-md py-2 px-4 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 text-sm">
                                        Reserve
                                    </button>

                                    <button
                                        onClick={() => handleCancelClick(reservation)} // Open the modal
                                        className="sm:w-auto lg:w-auto my-2 border rounded-md py-2 px-4 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 text-sm">
                                        Cancel
                                    </button>

                                    <button
                                        className="sm:w-auto lg:w-auto my-2 border rounded-md py-2 px-4 text-center bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 text-sm">
                                        <Link to="/ridesMap" className="block w-full h-full text-white no-underline">
                                            View in Map
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Modal
                        isVisible={isModalVisible}
                        ride={selectedRide} // Pass the selected ride to the Modal
                        user={user}         // Pass the logged-in user to the Modal
                        onClose={() => setModalVisible(false)} // Close modal handler
                        onConfirm={(reservationDetails) => {
                            console.log('Reservation Details (received from Modal):', reservationDetails); // Debugging log

                            // Dispatch the createReservation action with reservation details
                            dispatch(createReservation(reservationDetails));

                            // Close the modal
                            setModalVisible(false);
                            console.log('Selected Ride:', selectedRide);
                            console.log('User:', user);

                        }}/>
                    <button onClick={() => setModalVisible(false)}
                        className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 hover:bg-red-600">X</button>
                </div>
            )}
        </div>
    );
};
export default Home;