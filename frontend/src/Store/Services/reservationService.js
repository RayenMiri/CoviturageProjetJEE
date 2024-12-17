const BASE_URL = 'http://localhost:8083/api/reservation';
const token = JSON.parse(localStorage.getItem("user"))?.token || '';

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

export const fetchReservationByUserIdAPI = async (idUser) => {
    try {
        const response = await fetch(`${BASE_URL}/getReservationByUserId/${idUser}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch reservation by user ID');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const cancelReservationAPI = async (idRide, idUser) => {
    try {
        const response = await fetch(`${BASE_URL}/cancelReservation/${idRide}/${idUser}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Failed to cancel reservation' };
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message || 'Error cancelling reservation' };
    }
};

export const createReservationAPI = async (reservationDetails) => {
    try {
        if (!reservationDetails.idUser || !reservationDetails.idRide || !reservationDetails.nbOfSeats) {
            throw new Error('Missing required reservation details');
        }

        const response = await fetch(`${BASE_URL}/createReservation/${reservationDetails.idUser}/${reservationDetails.idRide}/${reservationDetails.nbOfSeats}`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to create reservation');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchReservationByIdAPI = async (resId) => {
    try {
        if (!resId) {
            return { error: 'Missing reservation ID' };
        }

        const response = await fetch(`${BASE_URL}/getReservationByUserId/${resId}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Failed to retrieve reservation' };
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message || 'An unexpected error occurred' };
    }
};

export const fetchReservationByRideIdAPI = async (rideId) => {
    try {
        if (!rideId) {
            return { error: 'Missing Ride ID' };
        }

        const response = await fetch(`${BASE_URL}/getReservationByRideId/${rideId}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Failed to fetch reservation by ride ID' };
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message || 'An unexpected error occurred' };
    }
};

export const findUserByIdAPI = async (id) => {
    try {
        const response = await fetch(`http://localhost:8083/api/users/${id}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to find user by ID');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
