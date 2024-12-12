// src/store/slices/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {createReviewAPI, getReviewByIdReviewedAPI, updateReviewAPI} from "../Services/ReviewService";

// Async thunks
export const createReview = createAsyncThunk(
    "reviews/createReview",
    async (review, { rejectWithValue }) => {
        try {
            console.log(review);
            const response = await createReviewAPI(review);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchReviewByUserId = createAsyncThunk(
    "reviews/fetchReviewByUserId",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getReviewByIdReviewedAPI(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateReview = createAsyncThunk(
    "reviews/updateReview",
    async (review, { rejectWithValue }) => {
        try {
            const response = await updateReviewAPI(review);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        rating: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload);
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchReviewByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.rating = action.payload;
            })
            .addCase(fetchReviewByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.reviews.findIndex(
                    (review) => review.id === action.payload.id
                );
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;
