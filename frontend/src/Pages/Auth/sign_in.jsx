import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginSuccess, setLoading, setError, handleSigninSuccess, handleSignupSuccess} from "../../Store/Slices/authSlice";
import { loginUser } from "../../Store/Services/authService";
import Alert from "react-bootstrap/Alert";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const timerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear error message after 3 seconds
        if (error) {
            timerRef.current = setTimeout(() => {
                dispatch(setError(""));
            }, 3000);
        }

        // Clear success message after 3 seconds
        if (successMessage) {
            timerRef.current = setTimeout(() => {
                setSuccessMessage("");
            }, 1501);
        }

        // Cleanup timer on component unmount
        return () => clearTimeout(timerRef.current);
    }, [error, successMessage, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try {
            const data = await loginUser({ username, password });

            if (data) {
                dispatch(
                    loginSuccess({
                        token: data.token,
                        username: data.username,
                        role:data.role,
                    })
                );
                setSuccessMessage(`Login successful! Welcome, ${data.username}.`);
                setTimeout(() => {
                    dispatch(handleSigninSuccess(navigate,data));
                }, 1500);
            }
        } catch (err) {
            console.error("Error during login:", err.message);
            dispatch(setError(err.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back!</h2>
                <p className="text-center text-gray-600">Sign in to your account</p>

                {/* Alerts for Error and Success Messages */}
                {error && (
                    <Alert variant="danger" className="mt-3 text-center">
                        {error}
                    </Alert>
                )}
                {successMessage && (
                    <Alert variant="success" className="mt-3 text-center">
                        {successMessage}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Username Input */}
                    <div className="relative">
                        <label htmlFor="userName" className="text-gray-600 block">
                            Username
                        </label>
                        <input
                            type="text"
                            id="userName"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="text-gray-600 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300 font-semibold"
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
