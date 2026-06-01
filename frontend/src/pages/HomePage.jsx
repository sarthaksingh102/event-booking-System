import React, { useEffect, useState } from 'react';
import * as eventService from '../services/eventService';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/Events/EventCard';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.getAllEvents();
                setEvents(data.slice(0, 6)); // Show only first 6 events
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleBook = (eventId) => {
        navigate(`/booking/${eventId}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/events?search=${searchTerm}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center animate-fadeIn">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        🎉 Discover Local Events
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 drop-shadow">
                        Book tickets for workshops, seminars, concerts & more
                    </p>
                    
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3 mb-8">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search events by name or location..."
                            className="flex-1 px-6 py-3 rounded-lg text-gray-800 font-medium focus:ring-4 focus:ring-orange-400 outline-none transition-all duration-200"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            🔍 Search
                        </button>
                    </form>

                    {/* CTA Button */}
                    <button
                        onClick={() => navigate('/events')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        Browse All Events →
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                        <div className="text-4xl mb-4">🎫</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking</h3>
                        <p className="text-gray-600">Book tickets in just a few clicks with our simple interface</p>
                    </div>
                    <div className="text-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
                        <p className="text-gray-600">Your payment information is encrypted and secure</p>
                    </div>
                    <div className="text-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                        <div className="text-4xl mb-4">📱</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Mobile Friendly</h3>
                        <p className="text-gray-600">Book events on the go with our responsive design</p>
                    </div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        ✨ Featured Events
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No events available right now</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="animate-fadeIn"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <EventCard event={event} onBook={handleBook} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Book Your First Event?</h2>
                    <p className="text-xl text-blue-100 mb-8">Join thousands of users enjoying amazing local events</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        Explore Events Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;