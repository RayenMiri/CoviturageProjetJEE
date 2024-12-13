import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupSuccess, setLoading, setError, handleSignupSuccess } from "../../Store/Slices/authSlice";
import { signupUser } from "../../Store/Services/authService";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); // For rider or passenger
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const timerRef = useRef()

    useEffect(()=>{
        if(error){
            timerRef.current = setTimeout(
                ()=> {
                    dispatch(setError(''));
                    //clearTimeout(timerRef.current);
                },
                3000
            );
        }
        if(successMessage){
            timerRef.current = setTimeout(
                ()=>{
                    dispatch(setSuccessMessage(''));
                    //clearTimeout(timerRef.current)
                },
                1501
            );
        }
        return()=>{
            clearTimeout(timerRef.current)
        }
    },[error,successMessage,dispatch]);

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
            const userData = await signupUser(name, email, password, role); // Pass the role
            dispatch(signupSuccess(userData));
            setSuccessMessage("Account created successfully!");
            setTimeout(() => {
                dispatch(handleSignupSuccess(navigate));
            }, 1500);
        } catch (err) {
            dispatch(setError(err.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>
                <p className="text-center text-gray-600">Create a new account</p>

                {/* Alerts for Success and Error */}
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

                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="text-gray-600 block">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-gray-600 block">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-gray-600 block">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="text-gray-600 block">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label htmlFor="role" className="text-gray-600 block">Select Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="RIDER">Rider</option>
                            <option value="PASSENGER">Passenger</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>
                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/sigin" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
