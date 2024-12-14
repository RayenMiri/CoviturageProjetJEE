import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../Store/Slices/authSlice";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";

const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const validateForm = () => {
        if (!name.trim() || !email.trim() || !message.trim()) {
            dispatch(setError("All fields are required."));
            return false;
        }
        // Basic email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            dispatch(setError("Please enter a valid email address."));
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(setLoading(true));

        // Simulate sending the message (this should be replaced with an actual API call)
        setTimeout(() => {
            setSuccessMessage("Your message has been sent successfully. We'll get back to you soon!");
            setName("");
            setEmail("");
            setMessage("");
            dispatch(setLoading(false));
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Contact Us
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Have any questions? We'd love to hear from you!
                </p>

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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="text-gray-600 block">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="text-gray-600 block">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Message Input */}
                    <div>
                        <label htmlFor="message" className="text-gray-600 block">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type={loading ? "button" : "submit"} // Disable submission while loading
                            className={`w-full py-3 rounded-lg font-semibold text-white ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            } transition duration-200 focus:ring-4 focus:ring-blue-300`}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Or contact us through the following:</p>
                    <div className="flex justify-center gap-8">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaPhoneAlt />
                            <span>+216 22 333 444</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaEnvelope />
                            <span>WeRide-Contact@WeRide.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaMapMarkedAlt />
                            <span>Tunis</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
