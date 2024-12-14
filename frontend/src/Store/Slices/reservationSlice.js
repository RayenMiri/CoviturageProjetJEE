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
    successMessage:null,
};
export const fetchReservationByUserId = createAsyncThunk(
    'reservation/getReservationByUserId',
    async (idUser, { rejectWithValue }) => {
        try {
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
            return await cancelReservationAPI(idRide, idUser);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const createReservation = createAsyncThunk(
    'reservation/createReservation',
    async (reservationDetails, { rejectWithValue }) => {
        try {
            return await createReservationAPI(reservationDetails);
        } catch (error) {
            // Use rejectWithValue to pass the error to the .rejected case
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
                state.successMessage =null;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations.push(action.payload);
                state.successMessage = "Reservation created successfully";
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