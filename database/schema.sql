-- Create Database
CREATE DATABASE IF NOT EXISTS event_booking_system;
USE event_booking_system;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  date DATETIME NOT NULL,
  location VARCHAR(150),
  capacity INT NOT NULL,
  available_seats INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Insert Sample Users (password: password123)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$slYQmyNdGzin7olVN.y76OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', 'ADMIN'),
('John Doe', 'user@example.com', '$2a$10$slYQmyNdGzin7olVN.y76OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', 'USER');

-- Insert Sample Events
INSERT INTO events (title, description, date, location, capacity, available_seats) VALUES
('React Workshop - Beginner to Advanced', 'Learn React from basics to advanced concepts including hooks, context, and state management', '2026-05-15 10:00:00', 'Tech Hub Downtown', 50, 45),
('Web Development Masterclass', 'Complete web development bootcamp covering HTML, CSS, JavaScript, and modern frameworks', '2026-05-20 14:00:00', 'Innovation Center', 100, 85),
('JavaScript ES6+ Deep Dive', 'Master JavaScript modern syntax and advanced concepts', '2026-05-25 09:00:00', 'Code Academy', 30, 25),
('Node.js Backend Development', 'Build scalable backend applications with Node.js and Express', '2026-06-01 11:00:00', 'Dev Hub', 40, 35),
('Database Design with SQL', 'Learn database design principles and SQL optimization', '2026-06-05 15:00:00', 'Data Center', 35, 20);