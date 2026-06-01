import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../services/bookingService';

const BookingAnalytics = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const totalBookings = bookings.length;

    // Calculate revenue and stats
    const bookingsByDate = {};
    bookings.forEach(booking => {
        const date = new Date(booking.bookingDate).toLocaleDateString();
        bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Booking Analytics</h1>
            <p>Total Bookings: {totalBookings}</p>
            <table className="min-w-full mt-4 border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">User</th>
                        <th className="border border-gray-300 p-2">Event</th>
                        <th className="border border-gray-300 p-2">Booking Date</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="border border-gray-300 p-2">{booking.user?.name || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">{booking.event?.title || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">{new Date(booking.booking_date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingAnalytics;