import React from "react";

const BenefitCard= ({ icon, title, description }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default BenefitCard;