function TestimonialCard({ quote, author }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 italic mb-4">"{quote}"</p>
            <p className="font-semibold">- {author}</p>
        </div>
    );
}
export default TestimonialCard;