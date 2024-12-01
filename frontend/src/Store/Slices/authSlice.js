import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user')) || null;
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user,
        isAuthenticated: !!user,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state.user));
            console.log(state.user);
        },

        signupSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    loginSuccess,
    signupSuccess,
    logout,
    setLoading,
    setError } = authSlice.actions;

export const handleSignupSuccess = (navigate) => {
    return (dispatch) => {
        dispatch(signupSuccess());
        navigate('/signin');
    };
};

export const handleSigninSuccess = (navigate,user) => {
    return (dispatch) => {
        dispatch(loginSuccess(user));
        navigate('/dashboard');
    };
};

export default authSlice.reducer;
