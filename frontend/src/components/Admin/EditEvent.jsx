import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../../services/eventService';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventService.getEventById(id);
                setEventData(response.data);
            } catch (err) {
                setError('Error fetching event data');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventService.updateEvent(id, eventData);
            navigate('/admin/events');
        } catch (err) {
            setError('Error updating event');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Event</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={eventData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
                </div>
                <div>
                    <label>Capacity:</label>
                    <input type="number" name="capacity" value={eventData.capacity} onChange={handleChange} required />
                </div>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;