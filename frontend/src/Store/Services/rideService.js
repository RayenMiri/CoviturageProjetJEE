const BASE_URL = "http://localhost:8083/api/rides";

const token = JSON.parse(localStorage.getItem("user"))?.token || '';

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

export const fetchRidesAPI = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getAllRides`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch rides');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching rides:", error.message);
        throw error;
    }
};

export const fetchRideByIdAPI = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/getRideById/${id}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch ride by ID');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching ride by ID:", error.message);
        throw error;
    }
};

export const addRideToAPI = async (rideDetails) => {
    try {
        const response = await fetch(`${BASE_URL}/createRide`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(rideDetails),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to add ride');
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding ride:", error.message);
        throw error;
    }
};

export const fetchRidesByDriverIdAPI = async (driverId) => {
    try {
        const response = await fetch(`${BASE_URL}/getRidesByDriverId/${driverId}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch rides by driver ID');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching rides by driver ID:", error.message);
        throw error;
    }
};

export const updateRideInAPI = async (id, updatedRide) => {
    try {
        const response = await fetch(`${BASE_URL}/updateRide/${id}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(updatedRide),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to update ride');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating ride:", error.message);
        throw error;
    }
};

export const deleteRideFromAPI = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/deleteRide/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete ride');
        }
        return true; // Successfully deleted
    } catch (error) {
        console.error("Error deleting ride:", error.message);
        throw error;
    }
};

export const searchRides = async (queryParams) => {
    try {
        const query = new URLSearchParams(queryParams).toString();
        const response = await fetch(`${BASE_URL}/searchRides?${query}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to search rides');
        }
        return await response.json();
    } catch (error) {
        console.error("Error searching rides:", error.message);
        throw error;
    }
};
