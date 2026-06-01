import React, { createContext, useState, useContext, useEffect } from 'react';
import * as bookingService from '../services/bookingService';
import { useAuth } from './AuthContext';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchBookings = async () => {
                try {
                    setLoading(true);
                    const response = await bookingService.getBookingHistory(user.id);
                    setBookingHistory(response);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchBookings();
        }
    }, [user]);

    const addBooking = async (newBooking) => {
        try {
            setLoading(true);
            const response = await bookingService.bookTicket(newBooking);
            setBookingData(response);
            setBookingHistory((prevBookings) => [...prevBookings, response]);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        bookingHistory,
        setBookingHistory,
        bookingData,
        setBookingData,
        loading,
        error,
        addBooking,
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};