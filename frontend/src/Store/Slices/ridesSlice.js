import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchRidesAPI,
    addRideToAPI,
    deleteRideFromAPI,
    searchRides,
    fetchRidesByDriverIdAPI,
    fetchRideByIdAPI,
    updateRideInAPI
} from "../Services/rideService";
import {geocodeLocation} from "../../Utils/gecode";

const initialState = {
    rides: [],
    loading: false,
    error: null,
};

export const fetchRides = createAsyncThunk(
    'rides/fetchRides',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchRidesAPI();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addRide = createAsyncThunk(
    'rides/addRide',
    async (rideDetails, { rejectWithValue }) => {
        try {
            console.log(JSON.stringify(rideDetails));
            return await addRideToAPI(rideDetails);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const geocodeRide = createAsyncThunk(
    'rides/geocodeRide',
    async (ride, { rejectWithValue }) => {
        try {
            const departureCoords = await geocodeLocation(ride.departureLocation);
            const destinationCoords = await geocodeLocation(ride.destination);
            return {
                idRide: ride.idRide,
                departureCoordinates: departureCoords,
                destinationCoordinates: destinationCoords
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRideById = createAsyncThunk(
    'rides/fetchRideById',
    async (id, { rejectWithValue }) => {
        try {
            return await fetchRideByIdAPI(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRidesByDriverId = createAsyncThunk(
    'rides/fetchRidesByDriverId',
    async (driverId, { rejectWithValue }) => {
        try {
            return await fetchRidesByDriverIdAPI(driverId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteRide = createAsyncThunk(
    'rides/deleteRide',
    async (id, { rejectWithValue }) => {
        try {
            await deleteRideFromAPI(id);
            return id; // Return ID to remove from state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchForRides = createAsyncThunk(
    'rides/searchForRides',
    async (queryParams, { rejectWithValue }) => {
        try {
            return await searchRides(queryParams);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateRide = createAsyncThunk(
    'rides/updateRide',
    async (ride) => {


        if (!ride || !ride.idRide) {
            throw new Error('Invalid ride object: idRide is missing');
        }
        const response = await updateRideInAPI(ride.idRide, ride);
        return response.data;
    }
);



const ridesSlice = createSlice({
    name: 'rides',
    initialState,
    reducers: {
        removeRide: (state, action) => {
            state.rides = state.rides.filter(ride => ride.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRides.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRides.fulfilled, (state, action) => {
                state.rides = action.payload;
                state.loading = false;
            })
            .addCase(fetchRides.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addRide.fulfilled, (state, action) => {
                state.rides.push(action.payload);
            })
            .addCase(addRide.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(geocodeRide.fulfilled, (state, action) => {
                const index = state.rides.findIndex(ride => ride.idRide === action.payload.idRide);
                if (index !== -1) {
                    state.rides[index] = {
                        ...state.rides[index],
                        departureCoordinates: action.payload.departureCoordinates,
                        destinationCoordinates: action.payload.destinationCoordinates
                    };
                }
            })
            .addCase(fetchRideById.fulfilled, (state, action) => {
                const index = state.rides.findIndex(ride => ride.id === action.payload.id);
                if (index !== -1) {
                    state.rides[index] = action.payload;
                } else {
                    state.rides.push(action.payload);
                }
            })
            .addCase(fetchRideById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchRidesByDriverId.fulfilled, (state, action) => {
                state.rides = action.payload;
            })
            .addCase(fetchRidesByDriverId.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteRide.fulfilled, (state, action) => {
                state.rides = state.rides.filter(ride => ride.id !== action.payload);
            })
            .addCase(deleteRide.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(searchForRides.fulfilled, (state, action) => {
                state.rides = action.payload;
            })
            .addCase(searchForRides.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateRide.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRide.fulfilled, (state, action) => {
                state.loading = false;
                const updatedRide = action.payload;

                if (updatedRide && updatedRide.idRide) {
                    const index = state.rides.findIndex((ride) => ride.idRide === updatedRide.idRide);
                    if (index !== -1) {
                        state.rides[index] = updatedRide;
                    }
                } else {
                    console.error('Invalid payload from updateRide API:', updatedRide);
                }
            })
            .addCase(updateRide.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    removeRide,
} = ridesSlice.actions;

export default ridesSlice.reducer;

