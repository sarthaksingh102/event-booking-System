import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, onBook }) => {
    const navigate = useNavigate();

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const getEventEmoji = (title) => {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('design')) return '🎨';
        if (titleLower.includes('comedy') || titleLower.includes('show')) return '🎤';
        if (titleLower.includes('music') || titleLower.includes('concert')) return '🎸';
        if (titleLower.includes('run') || titleLower.includes('marathon')) return '🏃';
        if (titleLower.includes('network') || titleLower.includes('business')) return '💼';
        if (titleLower.includes('cooking') || titleLower.includes('food')) return '🍳';
        if (titleLower.includes('yoga') || titleLower.includes('fitness')) return '💪';
        if (titleLower.includes('workshop')) return '🛠️';
        return '🎉';
    };

    const availableSeats = event.capacity - (event.bookedSeats || 0);
    const isAvailable = availableSeats > 0;

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
            {/* Header with Emoji Background */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-48 flex items-center justify-center relative overflow-hidden">
                <span className="text-7xl filter group-hover:scale-110 transition-transform duration-300">
                    {getEventEmoji(event.title)}
                </span>
                {!isAvailable && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Sold Out
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
                    {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📅</span>
                        <span className="font-medium">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">⏰</span>
                        <span className="font-medium">{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span className="font-medium line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <span className="font-medium">
                            {availableSeats} / {event.capacity} seats available
                        </span>
                    </div>
                </div>

                {/* Availability Bar */}
                <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((event.capacity - availableSeats) / event.capacity) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Price and Button */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                        <p className="text-gray-600 text-sm">Price</p>
                        <p className="text-3xl font-bold text-blue-600">${event.price || 0}</p>
                    </div>
                    <button
                        onClick={() => onBook(event.id)}
                        disabled={!isAvailable}
                        className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 transform ${
                            isAvailable
                                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 shadow-lg active:scale-95'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                    >
                        {isAvailable ? '🎫 Book' : 'Full'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;