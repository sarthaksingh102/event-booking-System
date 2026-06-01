import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import * as bookingService from '../../services/bookingService';
import * as eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';

const BookingForm = () => {
    const { id } = useParams();
    const { addBooking } = useBooking();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [event, setEvent] = useState(null);
    const [numTickets, setNumTickets] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eventLoading, setEventLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                if (id) {
                    const data = await eventService.getEventById(id);
                    setEvent(data);
                }
            } catch (err) {
                setError('Failed to load event details');
            } finally {
                setEventLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const availableSeats = event ? event.capacity - (event.bookedSeats || 0) : 0;
    const totalPrice = event ? (event.price || 0) * numTickets : 0;
    const serviceFee = totalPrice * 0.1;
    const finalTotal = totalPrice + serviceFee;

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const bookingData = {
                eventId: id,
                quantity: parseInt(numTickets),
                userId: user.id
            };
            const response = await bookingService.bookTicket(bookingData);
            await addBooking(response);
            setSuccess('🎉 Booking successful! Redirecting...');
            setTimeout(() => navigate('/bookings'), 2000);
        } catch (err) {
            setError('❌ Failed to book tickets. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (eventLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                    <p className="text-red-700 font-medium">Event not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                {/* Event Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                            <span className="text-7xl">🎪</span>
                        </div>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
                            <p className="text-gray-600 text-lg mb-6">{event.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">📅</span>
                                    <div>
                                        <p className="text-gray-600 text-sm">Date</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {new Date(event.date).toLocaleDateString('en-US', { 
                                                weekday: 'short', 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">⏰</span>
                                    <div>
                                        <p className="text-gray-600 text-sm">Time</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {new Date(event.date).toLocaleTimeString('en-US', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">📍</span>
                                    <div>
                                        <p className="text-gray-600 text-sm">Location</p>
                                        <p className="text-lg font-semibold text-gray-800">{event.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">👥</span>
                                    <div>
                                        <p className="text-gray-600 text-sm">Available Seats</p>
                                        <p className="text-lg font-semibold text-gray-800">{availableSeats} / {event.capacity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24 animate-slideUp">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Tickets</h2>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 animate-shake">
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 animate-slideDown">
                                <p className="text-green-700 font-medium">{success}</p>
                            </div>
                        )}

                        {availableSeats === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">😞</div>
                                <p className="text-gray-600 font-medium">This event is sold out</p>
                            </div>
                        ) : (
                            <form onSubmit={handleBooking} className="space-y-6">
                                {/* Ticket Quantity */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        Number of Tickets
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setNumTickets(Math.max(1, numTickets - 1))}
                                            disabled={numTickets === 1 || loading}
                                            className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold transition-all duration-200 disabled:opacity-50"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={numTickets}
                                            onChange={(e) => {
                                                const val = Math.min(availableSeats, Math.max(1, parseInt(e.target.value) || 1));
                                                setNumTickets(val);
                                            }}
                                            min="1"
                                            max={availableSeats}
                                            required
                                            disabled={loading}
                                            className="flex-1 px-4 py-2 text-center font-bold border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setNumTickets(Math.min(availableSeats, numTickets + 1))}
                                            disabled={numTickets === availableSeats || loading}
                                            className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold transition-all duration-200 disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Price per ticket:</span>
                                        <span className="font-semibold">${event.price || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal ({numTickets} ticket{numTickets !== 1 ? 's' : ''}):</span>
                                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Service fee (10%):</span>
                                        <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
                                        <span className="font-bold text-gray-800">Total:</span>
                                        <span className="font-bold text-blue-600">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Login Prompt */}
                                {!user && (
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                                        <p className="text-blue-700 text-sm">
                                            Please <a href="/login" className="font-bold underline">log in</a> to book tickets
                                        </p>
                                    </div>
                                )}

                                {/* Book Button */}
                                <button
                                    type="submit"
                                    disabled={loading || availableSeats === 0 || !user}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        '🎫 Book Now'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
