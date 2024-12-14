import React from 'react';
import { Car, Users, Leaf, DollarSign, Globe, Award } from 'lucide-react';
import BenefitCard from "../../Components/BenifitCard";

const AboutPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About WeRide</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        Connecting people, reducing traffic, and saving the environment one shared ride at a time.
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        At WeRide, we're on a mission to transform the way people travel. By connecting drivers with passengers,
                        we aim to reduce traffic congestion, lower carbon emissions, and create a more sustainable and
                        connected community.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose WeRide?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BenefitCard
                            icon={<DollarSign className="w-12 h-12 text-blue-600" />}
                            title="Save Money"
                            description="Split travel costs and reduce your expenses on commutes and long trips."
                        />
                        <BenefitCard
                            icon={<Leaf className="w-12 h-12 text-green-600" />}
                            title="Eco-Friendly"
                            description="Reduce your carbon footprint by sharing rides and decreasing the number of cars on the road."
                        />
                        <BenefitCard
                            icon={<Users className="w-12 h-12 text-purple-600" />}
                            title="Build Connections"
                            description="Meet new people, make friends, and expand your social and professional network."
                        />
                        <BenefitCard
                            icon={<Car className="w-12 h-12 text-red-600" />}
                            title="Convenient Travel"
                            description="Enjoy door-to-door service and avoid the hassles of public transportation."
                        />
                        <BenefitCard
                            icon={<Globe className="w-12 h-12 text-teal-600" />}
                            title="Reduce Traffic"
                            description="Help decrease congestion on our roads by sharing rides with others going the same way."
                        />
                        <BenefitCard
                            icon={<Award className="w-12 h-12 text-yellow-600" />}
                            title="Reliable Service"
                            description="Our rating system ensures high-quality rides and trustworthy co-travelers."
                        />
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg mb-4">
                            WeRide is a project developed by two passionate developers as part of our coursework for the LCS3 section in FST.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Join the WeRide Community?</h2>
                    <p className="text-xl mb-8">Start your journey towards smarter, greener, and more connected travel today.</p>
                    <a
                        href="/signup"
                        className="bg-white text-blue-600 py-3 px-8 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300"
                    >
                        Sign Up Now
                    </a>
                </div>
            </section>
        </div>
    );
};



export default AboutPage;

