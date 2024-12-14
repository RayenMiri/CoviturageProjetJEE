import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loginSuccess,
    setLoading,
    setError,
    handleSigninSuccess,
} from "../../Store/Slices/authSlice";
import { loginUser } from "../../Store/Services/authService";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const timerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear error or success messages after 3 seconds
        if (error || successMessage) {
            timerRef.current = setTimeout(() => {
                if (error) dispatch(setError(""));
                if (successMessage) setSuccessMessage("");
            }, 3000);
        }

        return () => clearTimeout(timerRef.current);
    }, [error, successMessage, dispatch]);

    const validateForm = () => {
        if (!username.trim() || !password.trim()) {
            dispatch(setError("Username and password are required."));
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(setLoading(true));
        try {
            const data = await loginUser({ username, password });
            dispatch(
                loginSuccess({
                    token: data.token,
                    username: data.username,
                    email: data.email,
                    role: data.role,
                })
            );
            setSuccessMessage(`Login successful! Welcome, ${data.username}.`);

            setTimeout(() => {
                dispatch(handleSigninSuccess(navigate, data));
            }, 1500);
        } catch (err) {
            dispatch(setError(err?.message || "An unexpected error occurred."));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-800">
                    Welcome Back!
                </h2>
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
                    <div>
                        <label htmlFor="username" className="text-gray-700 font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-transform duration-200 transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex justify-center">
                                <div className="spinner-border animate-spin" role="status"></div>
                                <span> Logging in...</span>
                            </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
