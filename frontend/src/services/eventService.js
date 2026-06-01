import axios from 'axios';
import { API_BASE_URL } from './api';

const eventService = {
    getAllEvents: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching events: ' + error.message);
        }
    },

    getEventById: async (eventId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching event: ' + error.message);
        }
    },

    createEvent: async (eventData, token) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/events`, eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error creating event: ' + error.message);
        }
    },

    updateEvent: async (eventId, eventData, token) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error updating event: ' + error.message);
        }
    },

    deleteEvent: async (eventId, token) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error deleting event: ' + error.message);
        }
    },
};

export default eventService;