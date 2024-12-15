import React, { useState } from 'react';

const ReviewModal = ({ isVisible, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);

    if (!isVisible) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }
        onSubmit(rating,isVisible=false);


    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4">Submit Review</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value={0}>Select a rating</option>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                                {value} Star{value !== 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;