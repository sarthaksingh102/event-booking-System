import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await login(email, password);
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-fadeIn">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center">
                        <div className="text-5xl mb-4">🔐</div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-blue-100">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="p-8 space-y-6">
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

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Signing in...
                                </span>
                            ) : (
                                '🚀 Sign In'
                            )}
                        </button>

                        {/* Forgot Password Link */}
                        <div className="text-center">
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                                Forgot your password?
                            </a>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200">
                                Create one now
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

export default LoginPage;
