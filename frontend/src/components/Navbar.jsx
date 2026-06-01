import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg shadow-md">
                            EB
                        </div>
                        <span className="text-white font-bold text-xl hidden sm:inline">EventBook</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/events" className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                            Events
                        </Link>
                        {user && (
                            <>
                                <Link to="/bookings" className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                                    My Bookings
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-white font-medium">👋 {user.username || user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-blue-200 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 animate-slideDown">
                        <Link to="/" className="block text-white hover:text-blue-200 py-2 transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/events" className="block text-white hover:text-blue-200 py-2 transition-colors duration-200">
                            Events
                        </Link>
                        {user && (
                            <>
                                <Link to="/bookings" className="block text-white hover:text-blue-200 py-2 transition-colors duration-200">
                                    My Bookings
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="block text-white hover:text-blue-200 py-2 transition-colors duration-200">
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-2 transition-colors duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="block text-white hover:text-blue-200 py-2 transition-colors duration-200">
                                    Login
                                </Link>
                                <Link to="/register" className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg mt-2 transition-colors duration-200">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;