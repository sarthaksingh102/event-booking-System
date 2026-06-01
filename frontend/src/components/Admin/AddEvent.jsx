import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../services/eventService';

const AddEvent = () => {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventService.addEvent(eventData);
            navigate('/admin/events'); // Redirect to event management page after successful addition
        } catch (err) {
            setError('Failed to add event. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        value={eventData.capacity}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEvent;