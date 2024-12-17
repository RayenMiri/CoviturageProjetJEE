const BASE_URL = "http://localhost:8083/api/reviews";
const token = JSON.parse(localStorage.getItem("user"))?.token || '';

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

export const createReviewAPI = async (review) => {
    try {
        console.log(JSON.stringify(review));
        const response = await fetch(`${BASE_URL}/createReview`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} ${errorData || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating review:", error.message);
        throw error;
    }
};

export const getReviewByIdReviewedAPI = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/getReviewByIdReviewed/${userId}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} ${errorData || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching review by user ID:", error.message);
        throw error;
    }
};

export const getReviewByIdRideAPI = async (idRide) => {
    try {
        const response = await fetch(`${BASE_URL}/getReviewsByIdRide/${idRide}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} ${errorData || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching reviews by ride ID:", error.message);
        throw error;
    }
};

export const updateReviewAPI = async (review) => {
    try {
        const response = await fetch(`${BASE_URL}/updateReview`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} ${errorData || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating review:", error.message);
        throw error;
    }
};
