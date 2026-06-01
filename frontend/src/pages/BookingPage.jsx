import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import BookingForm from '../components/Booking/BookingForm';
import BookingHistory from '../components/Booking/BookingHistory';
import * as eventService from '../services/eventService';

const BookingPage = () => {
    const { eventId } = useParams();
    const { bookingHistory } = useBooking();
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const data = await eventService.getEventById(eventId);
                setEventDetails(data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!eventDetails) {
        return <div>Event not found.</div>;
    }

    return (
        <div className="booking-page">
            <h1>{eventDetails.title}</h1>
            <p>{eventDetails.description}</p>
            <BookingForm eventId={eventId} eventDetails={eventDetails} />
            <BookingHistory bookings={bookingHistory} />
        </div>
    );
};

export default BookingPage;