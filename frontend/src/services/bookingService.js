import axios from 'axios';
import { API_BASE_URL } from './api';

const getAuthToken = () => localStorage.getItem('token');

// Function to book a ticket for an event
export const bookTicket = async (bookingData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error booking ticket');
    }
};

// Function to get booking history for a user
export const getBookingHistory = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching booking history');
    }
};

// Function to get all bookings (Admin)
export const getAllBookings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/all`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching all bookings');
    }
};