import React from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import EventManagement from '../components/Admin/EventManagement';
import BookingAnalytics from '../components/Admin/BookingAnalytics';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <AdminDashboard />
            <EventManagement />
            <BookingAnalytics />
        </div>
    );
};

export default AdminPage;