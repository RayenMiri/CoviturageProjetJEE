import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRides } from '../../Store/Slices/ridesSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();

    // Access rides, loading, error, and user role states from the Redux store
    const { rides, loading, error } = useSelector((state) => state.rides);
    const { role } = useSelector((state) => state.auth.user || { role: null });

    // Fetch rides when the component mounts
    useEffect(() => {
        dispatch(fetchRides());
    }, [dispatch]);

    return (
        <div className="homepage">
            {loading && <p>Loading rides...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && rides.length === 0 && <p>No rides available.</p>}
            <div className="rides-list flex flex-wrap justify-center column-gap-5 row-gap-5 ">
                {rides.map((ride) => (
                    <div
                        key={ride.idRide}
                        className="bg-white flex justify-center items-center w-full sm:w-11/12 md:w-6/12 lg:w-4/12 p-3 "
                    >
                        <div className="flex flex-col items-center justify-between text-black-50  bg-white dark:bg-gray-800 shadow-md shadow-gray-300 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 w-full h-auto rounded-xl transition-all ease-in-out duration-500">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center px-2 md:px-6">
                                    <a
                                        href={`/Profile/${ride.userId}`}
                                        className="flex items-center justify-center px-2 md:px-6"
                                    >
                                        <img
                                            className="w-16 hidden rounded-full ring-2 ring-green-600 shadow-lg shadow-green-600 m-2 md:block"
                                            src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg"
                                            alt="User Avatar"
                                        />
                                    </a>
                                    <div className="text-left">
                                        <h4 className="text-lg md:text-2xl lg:text-3xl ease-in-out duration-1000 uppercase">
                                            <span className="text-red-500">{ride.title}</span>
                                        </h4>
                                        <h4 className="text-sm md:text-base font-medium dark:text-gray-200">
                                            {ride.departureLocation} to {ride.destination}
                                        </h4>
                                    </div>
                                </div>
                                <div className="text-sm md:text-base text-right p-2 gap-4 ease-in-out duration-500">
                                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">{ride.date}</p>
                                </div>
                            </div>
                            <div className="text-left p-2">
                                <h3 className="text-base text-green-400 font-semibold">Details</h3>
                                <ul className="text-sm list-disc ml-0">
                                    <li className="mb-2">
                                        <span className="font-bold">Departure Location:</span> {ride.departureLocation}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-bold">Destination:</span> {ride.destination}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-bold">Available Seats:</span> {ride.availableSeats}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-bold">Price Per Seat:</span> {ride.pricePerSeat}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-bold">Restrictions:</span> {ride.restrictions}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-bold">Date:</span> {new Date(ride.departureDateTime).toLocaleDateString()}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-bold">Time:</span>{' '}
                                        {new Date(ride.departureDateTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </li>
                                </ul>
                                <div className="flex justify-end space-x-4">
                                    {role === 'PASSENGER' && (
                                        <button className="sm:w-auto lg:w-auto my-2 border rounded-md py-2 px-4 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 text-sm">
                                            <Link to="/" className="block w-full h-full text-white no-underline">
                                                Reserve
                                            </Link>
                                        </button>
                                    )}
                                    <button className="sm:w-auto lg:w-auto my-2 border rounded-md py-2 px-4 text-center bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 text-sm">
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
        </div>
    );
};

export default Home;
