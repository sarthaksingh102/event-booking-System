import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await register(formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError('Registration failed. Email might already exist.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-fadeIn">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-12 text-center">
                        <div className="text-5xl mb-4">✨</div>
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-orange-100">Join us to book amazing events</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded animate-shake">
                                <p className="text-red-700 font-medium">❌ {error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded animate-slideDown">
                                <p className="text-green-700 font-medium">✅ {success}</p>
                            </div>
                        )}

                        {/* Full Name Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-200"
                                required
                                disabled={loading}
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Creating account...
                                </span>
                            ) : (
                                '🎉 Create Account'
                            )}
                        </button>

                        {/* Terms */}
                        <p className="text-xs text-gray-500 text-center">
                            By signing up, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-white hover:text-blue-100 font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;