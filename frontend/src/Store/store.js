import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import rideReducer from './Slices/ridesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        rides:rideReducer,
    },

});

export default store;