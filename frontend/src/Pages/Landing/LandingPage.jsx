import { MapPin, Clock, DollarSign, Users, Shield } from 'lucide-react';
import TestimonialCard from "../../Components/TestimonialCard";
import StepCard from "../../Components/StepCard";
import FeatureCard from "../../Components/FeatureCard";
import screenshot from "../../assests/Screenshot_2.png"

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-16 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Share Rides, Save Money, Reduce Carbon Footprint</h1>
                        <p className="text-xl mb-8">Join WeRide today and experience a smarter way to travel.</p>
                        <a href="/signup" className="bg-white text-blue-700 py-3 px-8 rounded-full font-bold text-lg hover:bg-indigo-100 transition duration-300">
                            Get Started
                        </a>
                    </div>
                    <div className="md:w-1/2">
                        <img src={screenshot} alt="People carpooling" width="600" height="400" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose WeRide?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<MapPin className="w-12 h-12 text-blue-600" />}
                            title="Convenient Routes"
                            description="Find rides that match your route and schedule."
                        />
                        <FeatureCard
                            icon={<Clock className="w-12 h-12 text-blue-600" />}
                            title="Flexible Timing"
                            description="Choose rides that fit your schedule perfectly."
                        />
                        <FeatureCard
                            icon={<DollarSign className="w-12 h-12 text-blue-600" />}
                            title="Cost-Effective"
                            description="Save money on your daily commute or long trips."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <StepCard
                            number={1}
                            title="Sign Up"
                            description="Create your account in minutes."
                        />
                        <StepCard
                            number={2}
                            title="Find a Ride"
                            description="Search for available rides or offer your own."
                        />
                        <StepCard
                            number={3}
                            title="Travel Together"
                            description="Meet your carpool buddy and start your journey."
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <TestimonialCard
                            quote="WeRide has transformed my daily commute. I've saved money and made new friends!"
                            author="Ali Melki"
                        />
                        <TestimonialCard
                            quote="As a driver, I love how easy it is to find passengers and share costs."
                            author="Mohsen Ben Salah"
                        />
                    </div>
                </div>
            </section>

            {/* Ready To STart Section */}
            <section className="bg-blue-700 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to Start Your Journey?</h2>
                    <p className="text-xl mb-8">Join thousands of happy carpoolers and start saving today.</p>
                    <a href="/signup" className="bg-white text-blue-700 py-3 px-8 rounded-full font-bold text-lg hover:bg-indigo-100 transition duration-300">
                        Sign Up Now
                    </a>
                </div>
            </section>
        </div>
    );
}


export default LandingPage;
