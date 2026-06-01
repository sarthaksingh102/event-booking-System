import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as eventService from '../services/eventService';
import EventCard from '../components/Events/EventCard';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await eventService.getAllEvents();
                setEvents(data);
                setFilteredEvents(data);
            } catch (err) {
                setError('Failed to load events. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    // Filter and search events
    useEffect(() => {
        let result = [...events];

        // Apply search
        const search = searchParams.get('search') || searchTerm;
        if (search) {
            result = result.filter(event =>
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.description.toLowerCase().includes(search.toLowerCase()) ||
                event.location.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply category filter
        if (filterCategory !== 'all') {
            result = result.filter(event =>
                event.title.toLowerCase().includes(filterCategory.toLowerCase())
            );
        }

        // Apply sorting
        if (sortBy === 'date') {
            result.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortBy === 'price-low') {
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (sortBy === 'popularity') {
            result.sort((a, b) => (b.bookedSeats || 0) - (a.bookedSeats || 0));
        }

        setFilteredEvents(result);
    }, [events, searchTerm, filterCategory, sortBy, searchParams]);

    const handleBook = (eventId) => {
        navigate(`/booking/${eventId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-12 animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        🎪 Explore Events
                    </h1>
                    <p className="text-xl text-gray-600">
                        Browse all upcoming events and find something amazing to do
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Search</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search events..."
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                            >
                                <option value="all">All Events</option>
                                <option value="workshop">Workshops</option>
                                <option value="concert">Concerts</option>
                                <option value="sports">Sports</option>
                                <option value="seminar">Seminars</option>
                                <option value="networking">Networking</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                            >
                                <option value="date">Date (Earliest)</option>
                                <option value="price-low">Price (Low to High)</option>
                                <option value="price-high">Price (High to Low)</option>
                                <option value="popularity">Most Popular</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterCategory('all');
                                    setSortBy('date');
                                }}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Events Display */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Loading events...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg animate-shake">
                        <p className="text-red-700 font-medium">❌ {error}</p>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😞</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterCategory('all');
                                setSortBy('date');
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                            View All Events
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Found {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="animate-fadeIn"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <EventCard event={event} onBook={handleBook} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
