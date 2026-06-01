import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080/api'; // Update with your backend URL

// Auth API calls
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
};

// Event API calls
export const fetchEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
};

export const fetchEventById = async (eventId) => {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    return response.data;
};

export const createEvent = async (eventData, token) => {
    const response = await axios.post(`${API_BASE_URL}/events`, eventData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateEvent = async (eventId, eventData, token) => {
    const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, eventData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteEvent = async (eventId, token) => {
    const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Booking API calls
export const bookTicket = async (bookingData, token) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchUserBookings = async (token) => {
    const response = await axios.get(`${API_URL}/bookings/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchAllBookings = async (token) => {
    const response = await axios.get(`${API_URL}/bookings/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};