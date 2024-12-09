import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {createReservationAPI, fetchReservationByIdAPI} from "../Services/reservationService";
import { cancelReservationAPI } from "../Services/reservationService";
import {fetchRides} from "./ridesSlice";
const initialState = {
    reservations: [],
    loading: false,
    error: null,
};
export const fetchReservationById = createAsyncThunk(
    'reservation/History',
    async (id, { rejectWithValue }) => {
        try {
            return await fetchReservationByIdAPI(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const cancelReservation = createAsyncThunk(
    'reservation/cancelReservation',
    async (idRes, { rejectWithValue }) => {
        try {
            const message = await cancelReservationAPI(idRes);
            return message; // Return the success message
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
                state.loading = false;
                state.successMessage = action.payload; // Use the success message from the API
            })
            .addCase(cancelReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Display the error message
            });
    },
});

export default reservationSlice.reducer;
