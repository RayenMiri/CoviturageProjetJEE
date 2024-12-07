import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import rideReducer from './Slices/ridesSlice';
import reservationReducer from './Slices/reservationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        rides:rideReducer,
        reservation:reservationReducer,
    },

});

export default store;