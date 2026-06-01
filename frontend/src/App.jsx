import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/bookings" element={<BookingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;