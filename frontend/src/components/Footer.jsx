import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                                EB
                            </div>
                            <span className="font-bold text-xl">EventBook</span>
                        </div>
                        <p className="text-gray-400 text-sm">Your gateway to amazing local events</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link></li>
                            <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors duration-200">Events</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-200">Login</Link></li>
                            <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-200">Register</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Feedback</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8 mt-8">
                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mb-6">
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <span className="text-2xl">👍</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <span className="text-2xl">📧</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <span className="text-2xl">🐦</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <span className="text-2xl">📱</span>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} EventBook. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            Made with ❤️ for event lovers everywhere
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
