import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReservation } from "../Store/Slices/reservationSlice";
import { fetchRidesByDriverId, fetchRides, deleteRide, updateRide } from "../Store/Slices/ridesSlice";

const RidesDisplay = ({ userID, userRole }) => {
    const dispatch = useDispatch();
    const { rides, loading, error } = useSelector((state) => state.rides);
    const [reservationError, setReservationError] = useState(null);
    const [reservationSuccess, setReservationSuccess] = useState(null);

    const [filters, setFilters] = useState({
        departure: "",
        destination: "",
        maxPrice: "",
    });

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRide, setCurrentRide] = useState(null);

    useEffect(() => {
        if (userID) {
            if (userRole === "RIDER") {
                dispatch(fetchRidesByDriverId(userID));
            } else {
                dispatch(fetchRides());
            }
        }
    }, [dispatch, userID, userRole]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredRides = useMemo(() => {
        return rides.filter((ride) => {
            return (
                (filters.departure === "" || ride.departureLocation.toLowerCase().includes(filters.departure.toLowerCase())) &&
                (filters.destination === "" || ride.destination.toLowerCase().includes(filters.destination.toLowerCase())) &&
                (filters.maxPrice === "" || ride.pricePerSeat <= parseFloat(filters.maxPrice))
            );
        });
    }, [rides, filters]);

    const sortedRides = useMemo(() => {
        return filteredRides.sort((a, b) => {
            if (sortConfig.key) {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
            }
            return 0;
        });
    }, [filteredRides, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '↑' : '↓';
        }
        return '↕';
    };

    const handleDelete = (id) => {
        dispatch(deleteRide(id));
    };

    const handleEditClick = (ride) => {
        setCurrentRide(ride);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentRide(null);
    };

    const handleModalSave = () => {
        if (currentRide) {
            dispatch(updateRide(currentRide));
            setIsModalOpen(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentRide((prevRide) => ({
            ...prevRide,
            [name]: value,
        }));
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Available Rides</h2>
            {loading && <p className="text-center text-blue-500">Loading rides...</p>}
            {error && <p className="text-center text-red-500">Error: Something went wrong. Please try again.</p>}

            {/* Reservation status */}
            {reservationSuccess && <p className="text-green-500">{reservationSuccess}</p>}
            {reservationError && <p className="text-red-500">{reservationError}</p>}

            {/* Filters */}
            <div className="mb-4 flex space-x-4">
                <input
                    type="text"
                    name="departure"
                    placeholder="Filter by Departure"
                    value={filters.departure}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    aria-label="Departure filter"
                />
                <input
                    type="text"
                    name="destination"
                    placeholder="Filter by Destination"
                    value={filters.destination}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    aria-label="Destination filter"
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    aria-label="Max Price filter"
                />
            </div>

            {/* Rides Table */}
            <table className="w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2">Departure</th>
                    <th className="px-4 py-2">Destination</th>
                    <th className="px-4 py-2">Date & Time</th>
                    <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort('availableSeats')}>
                        Seats {getSortArrow('availableSeats')}
                    </th>
                    <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort('pricePerSeat')}>
                        Price {getSortArrow('pricePerSeat')}
                    </th>
                    <th className="px-4 py-2">Restrictions</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedRides.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center py-4">No rides available</td>
                    </tr>
                ) : (
                    sortedRides.map((ride) => (
                        <tr key={ride.idRide} className="border-t">
                            <td className="px-4 py-2">{ride.departureLocation}</td>
                            <td className="px-4 py-2">{ride.destination}</td>
                            <td className="px-4 py-2">{new Date(ride.departureDateTime).toLocaleString()}</td>
                            <td className="px-4 py-2">{ride.availableSeats}</td>
                            <td className="px-4 py-2">{ride.pricePerSeat} DT </td>
                            <td className="px-4 py-2">{ride.restrictions || "None"}</td>
                            <td className="px-4 py-2 flex space-x-2">
                                {/* Only RIDER can edit or delete */}
                                {userRole === "RIDER" && (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(ride)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                            aria-label="Edit ride"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ride.idRide)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            aria-label="Delete ride"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* Modal for Editing Ride */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-xl mb-4">Edit Ride</h3>
                        <div>
                            <input
                                type="text"
                                name="departureLocation"
                                value={currentRide.departureLocation}
                                onChange={handleInputChange}
                                placeholder="Departure Location"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="destination"
                                value={currentRide.destination}
                                onChange={handleInputChange}
                                placeholder="Destination"
                                className="w-full px-3 py-2 border rounded-md mt-2"
                            />
                            <input
                                type="datetime-local"
                                name="departureDateTime"
                                value={currentRide.departureDateTime}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md mt-2"
                            />
                            <input
                                type="number"
                                name="availableSeats"
                                value={currentRide.availableSeats}
                                onChange={handleInputChange}
                                placeholder="Available Seats"
                                className="w-full px-3 py-2 border rounded-md mt-2"
                            />
                            <input
                                type="number"
                                name="pricePerSeat"
                                value={currentRide.pricePerSeat}
                                onChange={handleInputChange}
                                placeholder="Price per Seat"
                                className="w-full px-3 py-2 border rounded-md mt-2"
                            />
                            <button
                                onClick={handleModalSave}
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleModalClose}
                                className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RidesDisplay;
