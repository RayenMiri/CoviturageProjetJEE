const BASE_URL = 'http://localhost:8083/api/reservation';
export const fetchReservationByUserIdAPI = async (idUser) => {
    const response = await fetch(`${BASE_URL}/getReservationByUserId/${idUser}`);
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
            const errorData = await response.json();
            return {error : errorData.message || "Failed to cancel reservation "}
        }
        return await response.json();

    } catch (error) {
        return { error: error.message || 'Error cancelling reservation' };
    }
};

export const createReservationAPI = async (reservationDetails) => {
    try {
        console.log('Received reservation details:', reservationDetails);

        if (!reservationDetails.idUser || !reservationDetails.idRide || !reservationDetails.nbOfSeats) {
            return { error: 'Missing required reservation details' };
        }
        const response = await fetch(`${BASE_URL}/createReservation/${reservationDetails.idUser}/${reservationDetails.idRide}/${reservationDetails.nbOfSeats}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Failed to create reservation' };
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating reservation:', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
};

export const fetchReservationByIdAPI = async (resId) => {
    try {
        if (!resId) {
            return { error: 'Missing reservation ID' };
        }
        const response = await fetch(`${BASE_URL}/getReservationByUserId/${resId}`);
        if(!response.ok) {
            const errorData = await response.json();
            return {error : errorData.message || "Failed to retrieve reservation "};
        }
        return await response.json();
    }catch (error) {
        console.error('Error creating reservation:', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
}

export const fetchReservationByRideIdAPI = async (rideId)=>{
    try{
        if(!rideId){
            return {error : "Missing Ride ID"};
        }
        const response = await fetch(`${BASE_URL}/getReservationByRideId/${rideId}`);
        if(!response.ok){
            const errorData = await response.json();
            return { error: errorData.message || 'Failed to fetch reservation by ride ID' };
        }
        return await response.json();
    }catch(error){
        return { error: error.message || 'An unexpected error occurred' };
    }
}

export const findUserByIdAPI = async (id) =>{
    try {
        const response = await fetch(`http://localhost:8083/api/users/${id}`);
        if(!response.ok){
            return await response.text();
        }
        return await response.json();
    }catch (error) {
        console.log(error);
    }
}