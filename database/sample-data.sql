-- Users
INSERT INTO Users (name, email, password, role) VALUES 
('John Doe', 'john.doe@example.com', 'hashed_password_1', 'USER'),
('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', 'USER'),
('Admin User', 'admin@example.com', 'hashed_password_3', 'ADMIN');

-- Events
INSERT INTO Events (title, description, date, location, capacity) VALUES 
('Local Art Workshop', 'A workshop to explore local art techniques.', '2023-11-15 10:00:00', 'Community Center', 50),
('Tech Seminar', 'A seminar on the latest in technology.', '2023-11-20 14:00:00', 'University Auditorium', 100),
('Cultural Fest', 'A celebration of local culture and traditions.', '2023-12-01 09:00:00', 'City Park', 200);

-- Bookings
INSERT INTO Bookings (user_id, event_id, booking_date) VALUES 
(1, 1, '2023-11-01 12:00:00'),
(2, 2, '2023-11-02 15:30:00'),
(1, 3, '2023-11-03 09:45:00');