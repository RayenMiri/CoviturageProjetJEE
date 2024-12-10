import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRidesByDriverId, fetchRides, deleteRide, updateRide } from "../Store/Slices/ridesSlice";

const RidesDisplay = ({ userID, userRole }) => {
    const dispatch = useDispatch();
    const { rides, loading, error } = useSelector((state) => state.rides);

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

    const sortedRides = rides.filter((ride) => {
        return (
            (filters.departure === "" || ride.departureLocation.toLowerCase().includes(filters.departure.toLowerCase())) &&
            (filters.destination === "" || ride.destination.toLowerCase().includes(filters.destination.toLowerCase())) &&
            (filters.maxPrice === "" || ride.pricePerSeat <= parseFloat(filters.maxPrice))
        );
    }).sort((a, b) => {
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
            console.log(currentRide);
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
            {error && <p className="text-center text-red-500">Error: {error}</p>}

            {/* Filters */}
            <div className="mb-4 flex space-x-4">
                <input
                    type="text"
                    name="departure"
                    placeholder="Filter by Departure"
                    value={filters.departure}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                    type="text"
                    name="destination"
                    placeholder="Filter by Destination"
                    value={filters.destination}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                    {
                        userRole === "RIDER" && (
                            <>
                                <th className="px-4 py-2">Actions</th>
                            </>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {sortedRides.map((ride) => (
                    <tr key={ride.idRide} className="border-t">
                        <td className="px-4 py-2">{ride.departureLocation}</td>
                        <td className="px-4 py-2">{ride.destination}</td>
                        <td className="px-4 py-2">{new Date(ride.departureDateTime).toLocaleString()}</td>
                        <td className="px-4 py-2">{ride.availableSeats}</td>
                        <td className="px-4 py-2">{ride.pricePerSeat} DT </td>
                        <td className="px-4 py-2">{ride.restrictions || "None"}</td>
                        <td className="px-4 py-2 flex space-x-2">
                            {userRole === "RIDER" && (
                                <>
                                    <button
                                    onClick={() => handleEditClick(ride)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                        <button
                                        onClick={() => handleDelete(ride.idRide)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </>
                        )}

                    </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Edit Ride</h3>
                        <div className="space-y-4">
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
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="number"
                                name="pricePerSeat"
                                value={currentRide.pricePerSeat}
                                onChange={handleInputChange}
                                placeholder="Price Per Seat"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={handleModalClose}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleModalSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RidesDisplay;
