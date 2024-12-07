import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createReservationAPI } from "../Services/reservationService";

const initialState = {
    reservations: [],
    loading: false,
    error: null,
};

// Async thunk to handle creating a reservation
export const createReservation = createAsyncThunk(
    'reservation/createReservation',
    async (reservationDetails, { rejectWithValue }) => {
        try {
            return await createReservationAPI(reservationDetails);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Slice
const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations.push(action.payload);
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reservationSlice.reducer;
