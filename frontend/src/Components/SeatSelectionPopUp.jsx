import {useEffect, useState} from "react";

const SeatSelectionPopup = ({ onClose, onSubmit, availableSeats }) => {
    const [seats, setSeats] = useState(1);

    const handleSeatsChange = (e) => {
        const value = Math.max(1, Math.min(availableSeats, e.target.value));
        setSeats(value);
    };

    const handleSubmit = () => {
        onSubmit(seats);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Select Number of Seats</h2>
                <div className="mt-4">
                    <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
                        Number of Seats
                    </label>
                    <input
                        id="seats"
                        type="number"
                        min="1"
                        max={availableSeats}
                        value={seats}
                        onChange={handleSeatsChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-gray-600">Available Seats: {availableSeats}</div>
                </div>
                <div className="mt-4 flex gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Confirm Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelectionPopup;
