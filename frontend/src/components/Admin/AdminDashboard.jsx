import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/admin/events" className="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600">
                    Manage Events
                </Link>
                <Link to="/admin/bookings" className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">
                    View Bookings
                </Link>
                <Link to="/admin/add-event" className="bg-yellow-500 text-white p-4 rounded shadow hover:bg-yellow-600">
                    Add New Event
                </Link>
                <Link to="/admin/analytics" className="bg-purple-500 text-white p-4 rounded shadow hover:bg-purple-600">
                    Booking Analytics
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;