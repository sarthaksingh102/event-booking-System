import React, { useEffect, useState } from 'react';
import * as eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const data = await eventService.getAllEvents();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eventService.deleteEvent(id, localStorage.getItem('token'));
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Management</h1>
            <Link to="/admin/add-event" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Add New Event
            </Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Title</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Date</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td className="border-b border-gray-300 px-4 py-2">{event.title}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                            <td className="border-b border-gray-300 px-4 py-2">
                                <Link to={`/admin/edit-event/${event.id}`} className="text-blue-500 mr-2">Edit</Link>
                                <button onClick={() => handleDelete(event.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventManagement;