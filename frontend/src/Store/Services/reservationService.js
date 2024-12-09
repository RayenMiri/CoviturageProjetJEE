const BASE_URL = 'http://localhost:8083/api/reservation';
export const fetchReservationByIdAPI = async (idUser) => {
    const response = await fetch(`${BASE_URL}/getReservation/${idUser}`);
    if (!response.ok) {
        throw new Error('Failed to fetch reservation by ID');
    }
    return response.json();
};
export const cancelReservationAPI = async(idRide,idUser)=>
{
    try {
        const response = await fetch(`${BASE_URL}/cancelReservation/${idRide}/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to cancel reservation');
        }
        const mes = await response.text(); // Assuming the API returns plain text
        return mes;
    } catch (error) {
        throw error.mes || 'Error cancelling reservation';
    }
};

export const createReservationAPI = async (reservationDetails) => {
    try {
        console.log('Received reservation details:', reservationDetails);  // Debugging log

        // Validate required fields
        if (!reservationDetails.idUser || !reservationDetails.idRide || !reservationDetails.nbOfSeats) {
            return { error: 'Missing required reservation details' }; // Return error in a structured format
        }
        const response = await fetch(`${BASE_URL}/createReservation/${reservationDetails.idUser}/${reservationDetails.idRide}/${reservationDetails.nbOfSeats}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        // Check for successful response
        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Failed to create reservation' };  // Return error in a structured format
        }
        // Return the response data if successful
        return await response.json();
    } catch (error) {
        console.error('Error creating reservation:', error);
        return { error: error.message || 'An unexpected error occurred' };  // Return error details in a structured format
    }
};
