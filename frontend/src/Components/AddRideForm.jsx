import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRide } from "../Store/Slices/ridesSlice";
import { getCurrentTime} from "../Utils/getCurrentTimeUtil";

const AddRideForm = ({ userID }) => {
    const dispatch = useDispatch();

    const [newRide, setNewRide] = useState({
        departureLocation: "",
        destination: "",
        departureDateTime: "",
        availableSeats: "",
        pricePerSeat: "",
        restrictions: "",
        createdAt: getCurrentTime(),
        updatedAt: getCurrentTime(),
        driverId: userID,
    });

    const [formMessage, setFormMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRide((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddRide = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addRide(newRide)).unwrap();
            setFormMessage("Ride added successfully!");
            setNewRide({
                departureLocation: "",
                destination: "",
                departureDateTime: "",
                availableSeats: "",
                pricePerSeat: "",
                restrictions: "",
                createdAt: getCurrentTime(),
                updatedAt: getCurrentTime(),
                driverId: userID,
            });
        } catch (error) {
            setFormMessage(`Error adding ride: ${error.message}`);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Add a New Ride</h2>
            {formMessage && (
                <p className="text-center text-green-500">{formMessage}</p>
            )}
            <form onSubmit={handleAddRide} className="space-y-4">
                {/* Departure Location */}
                <div>
                    <label htmlFor="departureLocation" className="block text-gray-700 font-medium">
                        Departure Location
                    </label>
                    <input
                        type="text"
                        id="departureLocation"
                        name="departureLocation"
                        value={newRide.departureLocation}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Destination */}
                <div>
                    <label htmlFor="destination" className="block text-gray-700 font-medium">
                        Destination
                    </label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={newRide.destination}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Departure Date and Time */}
                <div>
                    <label htmlFor="departureDateTime" className="block text-gray-700 font-medium">
                        Departure Date and Time
                    </label>
                    <input
                        type="datetime-local"
                        id="departureDateTime"
                        name="departureDateTime"
                        value={newRide.departureDateTime}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Available Seats */}
                <div>
                    <label htmlFor="availableSeats" className="block text-gray-700 font-medium">
                        Available Seats
                    </label>
                    <input
                        type="number"
                        id="availableSeats"
                        name="availableSeats"
                        value={newRide.availableSeats}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Price Per Seat */}
                <div>
                    <label htmlFor="pricePerSeat" className="block text-gray-700 font-medium">
                        Price (per seat)
                    </label>
                    <input
                        type="number"
                        id="pricePerSeat"
                        name="pricePerSeat"
                        value={newRide.pricePerSeat}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Restrictions */}
                <div>
                    <label htmlFor="restrictions" className="block text-gray-700 font-medium">
                        Restrictions/Comments
                    </label>
                    <textarea
                        id="restrictions"
                        name="restrictions"
                        value={newRide.restrictions}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Add Ride
                </button>
            </form>
        </div>
        )
};

export default AddRideForm;
