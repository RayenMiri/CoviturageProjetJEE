import React from 'react';
import {useState} from "react"
const Modal = ({ isVisible, ride, user, onClose, onConfirm }) => {
    const [seats, setSeats] = useState(1);
    // Return null if Modal is not visible
    if (!isVisible) return null;
    // Handle missing ride gracefully
    if (!ride) {
        return (
            <div className="relative flex flex-col max-w-md gap-4 p-6 rounded-md shadow-md bg-gray-100 dark:text-gray-200">
                <p>Loading ride details...</p>
                <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded-md">
                    Close
                </button>
            </div>
        );
    }
    const handleConfirm = () => {
        const reservationDetails = {
            idUser: user.id,      // Get user id from localStorage or state
            idRide: ride.id,      // Get ride id from the selected ride
            seats: seats     // Get number of seats from the input or default value
        };

        console.log('Reservation Details:', reservationDetails);  // Debugging line
        onConfirm(reservationDetails);  // Pass structured data to parent component
    };

    return(
        <div className="flex flex-col max-w-md gap-2 p-6 rounded-md
         shadow-md bg-gray-100 dark:text-gray-200">
            <h2 className="text-xl font-semibold leading-tight tracking-wide">Comfirming your Reservation ..</h2>
            <p className="flex-1 dark:text-gray-600">
                Hello dear passenger , How many seats do you wish to reserve ?
            </p>
            <div className="mb-4 flex space-x-4">
                <input
                    type="number"
                    value={seats}
                    min="1"
                    max={ride.availableSeats || 1} // Fallback if availableSeats is undefined
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none"/>

            </div>
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
                <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded-md">
                    Cancel
                </button>
                <button onClick={handleConfirm} className="bg-green-500 text-white py-2 px-4 rounded-md">
                    Confirm
                </button>
            </div>

        </div>
    )
}
export default Modal;