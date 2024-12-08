const BASE_URL = 'http://localhost:8083/api/reservation';

export const createReservationAPI = async (reservationDetails) => {
    try {
        console.log('Received reservation details:', reservationDetails);  // Debugging log

        // Validate required fields
        if (!reservationDetails.idUser || !reservationDetails.idRide || !reservationDetails.nbOfSeats) {
            return { error: 'Missing required reservation details' }; // Return error in a structured format
        }
        // const CreateResBody  =  {
        //     idUser:reservationDetails.idUser,
        //     idRide:reservationDetails.idRide,
        //     nbOfSeats :reservationDetails.nbOfSeats
        // }
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
// export const createReservationAPI = async ({ idUser, idRide, nbSeats }) => {
//     console.log('Reservation Details:', { idUser, idRide, nbSeats });
//     const response = await fetch(
//         `${BASE_URL}/createReservation/${idUser}/${idRide}/${nbSeats}`,
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//         }
//     );
//     if (!response.ok) {
//         throw new Error('Failed to create reservation');
//     }
//     return response.json();
// };
