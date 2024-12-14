function StepCard({ number, title, description }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center mb-8 md:mb-0 w-full md:w-64">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                {number}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default StepCard;