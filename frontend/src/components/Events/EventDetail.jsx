import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as eventService from '../../services/eventService';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventService.getEventById(id);
                setEvent(response);
            } catch (err) {
                setError('Error fetching event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="event-detail">
            <h1 className="text-2xl font-bold">{event?.title}</h1>
            <p className="mt-2">{event?.description}</p>
            <p className="mt-2">Date: {event?.date ? new Date(event.date).toLocaleDateString() : 'N/A'}</p>
            <p className="mt-2">Location: {event?.location}</p>
            <p className="mt-2">Capacity: {event?.capacity}</p>
        </div>
    );
};

export default EventDetail;