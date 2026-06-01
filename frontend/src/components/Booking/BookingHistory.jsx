import React, { useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

const BookingHistory = () => {
    const { bookingHistory, loading } = useBooking();

    if (loading) return <div className="p-4">Loading booking history...</div>;

    return (
        <div className="booking-history">
            <h2 className="text-2xl font-bold mb-4">Your Booking History</h2>
            {!bookingHistory || bookingHistory.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookingHistory.map((booking) => (
                        <li key={booking.id} className="border-b py-2">
                            <h3 className="font-semibold">{booking.event?.title}</h3>
                            <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p>Event Date: {new Date(booking.event?.date).toLocaleDateString()}</p>
                            <p>Location: {booking.event?.location}</p>
                            <p>Quantity: {booking.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingHistory;