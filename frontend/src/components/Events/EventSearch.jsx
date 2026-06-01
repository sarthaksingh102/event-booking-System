import React, { useState } from 'react';

const EventSearch = ({ events, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="event-search">
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    placeholder="Search for events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-l"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
                    Search
                </button>
            </form>
        </div>
    );
};

export default EventSearch;