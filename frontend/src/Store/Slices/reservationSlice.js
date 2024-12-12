import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    cancelReservationAPI,
    createReservationAPI,
    fetchReservationByRideIdAPI,
    fetchReservationByUserIdAPI
} from "../Services/reservationService";

const initialState = {
    reservations: [],
    loading: false,
    error: null,
};
export const fetchReservationByUserId = createAsyncThunk(
    'reservation/getReservationByUserId',
    async (idUser, { rejectWithValue }) => {
        try {
            console.log(await fetchReservationByUserIdAPI(idUser));
            return await fetchReservationByUserIdAPI(idUser);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const cancelReservation = createAsyncThunk(
    'reservation/cancelReservation',
    async ({idRide,idUser}, { rejectWithValue }) => { // Accept an object with idRide and idUser
        try {
             // Pass both parameters to the API
            console.log("Cancelling reservation with ID:", idRide, idUser);

            return await cancelReservationAPI(idRide, idUser); // Return the success message
        } catch (error) {
            return rejectWithValue(error); // Reject with the error message
        }
    }
);
export const createReservation = createAsyncThunk(
    'reservation/createReservation',
    async (reservationDetails, { rejectWithValue }) => {
        try {
            console.log(reservationDetails)
            return await createReservationAPI(reservationDetails);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchReservationById = createAsyncThunk(
    'reservation/getReservation',
    async (resId,{rejectWithValue}) => {
        try {
            return await fetchReservationByUserIdAPI(resId);
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchReservationByRideId = createAsyncThunk(
    'reservation/getReservationByRideId',
    async (rideId,{rejectWithValue}) => {
        try{
            console.log(await fetchReservationByRideIdAPI(rideId));
            return await fetchReservationByRideIdAPI(rideId);
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReservationById.fulfilled, (state, action) => {
                state.reservations = action.payload;
                state.loading = false;
            })
            .addCase(fetchReservationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.loading = false;
                console.log('New Reservation:', action.payload);
                state.reservations.push(action.payload);
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(cancelReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(cancelReservation.fulfilled, (state, action) => {
                state.reservations = state.reservations.filter(
                    (res) => res.ride?.idRide !== action.payload.idRide
                );
            })

            .addCase(cancelReservation.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload; // Display the error message
                })
            .addCase(fetchReservationByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReservationByUserId.fulfilled, (state, action) => {
                state.reservations = action.payload;
                state.loading = false;
            })
            .addCase(fetchReservationByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchReservationByRideId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReservationByRideId.fulfilled, (state, action) => {
                let newReservations = [];
                if(Array.isArray(action.payload)){
                    newReservations = action.payload.filter(
                        (newRes) => !state.reservations.find((res)=>res.idReservation === newRes.idReservation)
                    );
                }
                state.reservations = [...state.reservations, ...newReservations];
                state.loading = false;
            })
            .addCase(fetchReservationByRideId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        },
});

export default reservationSlice.reducer;