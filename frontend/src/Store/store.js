import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import rideReducer from './Slices/ridesSlice';
import reservationReducer from './Slices/reservationSlice';
import reviewsReducer from './Slices/ReviewSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        rides:rideReducer,
        reservations:reservationReducer,
        reviews:reviewsReducer,
    },

});

export default store;