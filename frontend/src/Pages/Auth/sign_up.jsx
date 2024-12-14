import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    signupSuccess,
    setLoading,
    setError,
    handleSignupSuccess,
} from "../../Store/Slices/authSlice";
import { signupUser } from "../../Store/Services/authService";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const timerRef = useRef();

    useEffect(() => {
        if (error) {
            timerRef.current = setTimeout(() => {
                dispatch(setError(""));
            }, 3000);
        }
        if (successMessage) {
            timerRef.current = setTimeout(() => {
                setSuccessMessage("");
            }, 1501);
        }
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [error, successMessage, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!role) {
            dispatch(setError("Please select a role"));
            return;
        }

        if (password !== confirmPassword) {
            dispatch(setError("Passwords do not match"));
            return;
        }

        dispatch(setLoading());
        try {
            const userData = await signupUser(name, email, password, role);
            dispatch(signupSuccess(userData));
            setSuccessMessage("Account created successfully!");
            setTimeout(() => {
                dispatch(handleSignupSuccess(navigate));
            }, 1500);
        } catch (err) {
            dispatch(setError(err.message));
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const validatePasswordStrength = (password) => {
        return password.length >= 8;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-800">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Join us by creating a new account
                </p>

                {/* Alerts */}
                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}
                {successMessage && (
                    <Alert variant="success" className="mt-3">
                        {successMessage}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="text-gray-700 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            aria-describedby="emailHelp"
                        />
                        {!validateEmail(email) && email && (
                            <p className="text-red-500 text-xs" id="emailHelp">
                                Please enter a valid email address.
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-gray-700 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                aria-describedby="passwordHelp"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {password && !validatePasswordStrength(password) && (
                            <p className="text-red-500 text-xs" id="passwordHelp">
                                Password must be at least 8 characters long.
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="text-gray-700 font-medium"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="text-gray-700 font-medium">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="RIDER">Rider</option>
                            <option value="PASSENGER">Passenger</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-transform duration-200 transform hover:scale-105"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex justify-center">
                                <div className="spinner-border animate-spin" role="status"></div>
                                <span> Creating Account...</span>
                            </span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                {/* Redirect */}
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;