const BASE_URL = 'http://localhost:8083/api/reservation';
export const createReservationAPI = async ({ idUser, idRide, nbSeats }) => {
    console.log('Reservation Details:', { idUser, idRide, nbSeats });
    const response = await fetch(
        `${BASE_URL}/createReservation/${idUser}/${idRide}/${nbSeats}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to create reservation');
    }
    return response.json();
};
