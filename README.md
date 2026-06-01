---
title: Eventbooking
emoji: 🎟️
colorFrom: indigo
colorTo: purple
sdk: docker
pinned: false
---
# Local Event Booking System

## Project Overview
The Local Event Booking System is a modern full-stack web application that allows users to browse, register, and book tickets for local events such as workshops, seminars, cultural programs, and college fests. The system is designed with a RESTful architecture, using a modern frontend framework and a scalable backend, simulating real-world platforms like Eventbrite or BookMyShow.

## Technology Stack
- **Frontend**: React, Tailwind CSS, JavaScript (ES6+), Axios
- **Backend**: Java, Spring Boot
- **Database**: MySQL
- **Server & Deployment**: Embedded server (via Spring Boot), Git & GitHub
- **Additional Integrations**: JavaMail API, JWT Authentication

## User Roles
- **User**: Register/Login, View available events, Book tickets, View booking history
- **Admin**: Add, Update/Delete events, View all bookings, Manage event capacity

## Core Features
### Essential Features
- User authentication (JWT-based login/register)
- Event listing with detailed information
- Ticket booking system with seat availability check
- Admin panel for event management
- REST API integration between frontend and backend

### Advanced Features
- Event search and filtering (date, category, location)
- Email confirmation after booking
- Booking history dashboard for users
- Admin analytics dashboard (total bookings, users)
- Booking deadline enforcement
- Secure API endpoints with authentication

## System Workflow
1. User registers or logs in using JWT authentication
2. Frontend fetches event data via REST APIs
3. User browses and selects an event
4. User clicks “Book Ticket”
5. Backend validates seat availability
6. If seats are available:
   - Booking is stored in the database
   - Confirmation email is sent
7. User can view booking history
8. Admin manages events and monitors bookings

## API Overview
- **Authentication**
  - POST /api/auth/register
  - POST /api/auth/login
- **Events**
  - GET /api/events
  - GET /api/events/{id}
  - POST /api/events (Admin)
  - PUT /api/events/{id} (Admin)
  - DELETE /api/events/{id} (Admin)
- **Bookings**
  - POST /api/bookings
  - GET /api/bookings/user
  - GET /api/bookings/all (Admin)

## Setup Instructions
1. Clone the repository.
2. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
3. Navigate to the `backend` directory and run `mvn install` to install backend dependencies.
4. Set up the MySQL database using the provided schema and sample data.
5. Configure application properties in `backend/src/main/resources/application.properties`.
6. Run the backend server and the frontend application.

## Future Enhancements
- QR Code-based ticket generation
- Waitlist system for fully booked events
- AI-based event recommendation system
- Payment gateway integration
- Multi-role system (Organizer, Admin, User)

## Expected Outcome
A fully functional, modern web application demonstrating:
- Full-stack development using React and Spring Boot
- REST API design and integration
- Secure authentication and authorization
- Real-world booking workflow
- Clean UI and scalable backend architecture

## Development Guidelines
- Follow clean code and modular architecture
- Use proper error handling and validation
- Maintain secure authentication practices (JWT)
- Ensure responsive and user-friendly UI
- Write readable and maintainable code

## License
This project is licensed under the MIT License.