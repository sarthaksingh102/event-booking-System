import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, bookingDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Confirmation</h2>
                <p className="mb-2">Thank you for your booking!</p>
                <p className="mb-2">Event: {bookingDetails.eventTitle}</p>
                <p className="mb-2">Date: {bookingDetails.eventDate}</p>
                <p className="mb-2">Seats: {bookingDetails.seats}</p>
                <button 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;