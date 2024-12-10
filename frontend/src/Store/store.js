import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import rideReducer from './Slices/ridesSlice';
import reservationReducer from './Slices/reservationSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        rides:rideReducer,
        reservations:reservationReducer,
    },

});

export default store;