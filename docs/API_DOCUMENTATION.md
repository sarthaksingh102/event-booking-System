# API Documentation for Local Event Booking System

## Overview
This document provides an overview of the API endpoints available in the Local Event Booking System. The API follows RESTful principles and is designed to facilitate interaction between the frontend and backend of the application.

## Base URL
The base URL for the API is:
```
http://localhost:8080/api
```

## Authentication Endpoints

### Register User
- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created:** User registered successfully.
  - **400 Bad Request:** Validation errors.

### Login User
- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** Returns JWT token.
  - **401 Unauthorized:** Invalid credentials.

## Event Endpoints

### Get All Events
- **Endpoint:** `GET /events`
- **Description:** Retrieves a list of all events.
- **Response:**
  - **200 OK:** Returns an array of events.

### Get Event by ID
- **Endpoint:** `GET /events/{id}`
- **Description:** Retrieves details of a specific event.
- **Response:**
  - **200 OK:** Returns event details.
  - **404 Not Found:** Event not found.

### Create Event (Admin)
- **Endpoint:** `POST /events`
- **Description:** Creates a new event (Admin only).
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "date": "string",
    "location": "string",
    "capacity": "integer"
  }
  ```
- **Response:**
  - **201 Created:** Event created successfully.
  - **403 Forbidden:** Admin privileges required.

### Update Event (Admin)
- **Endpoint:** `PUT /events/{id}`
- **Description:** Updates an existing event (Admin only).
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "date": "string",
    "location": "string",
    "capacity": "integer"
  }
  ```
- **Response:**
  - **200 OK:** Event updated successfully.
  - **404 Not Found:** Event not found.
  - **403 Forbidden:** Admin privileges required.

### Delete Event (Admin)
- **Endpoint:** `DELETE /events/{id}`
- **Description:** Deletes an event (Admin only).
- **Response:**
  - **204 No Content:** Event deleted successfully.
  - **404 Not Found:** Event not found.
  - **403 Forbidden:** Admin privileges required.

## Booking Endpoints

### Create Booking
- **Endpoint:** `POST /bookings`
- **Description:** Creates a new booking for an event.
- **Request Body:**
  ```json
  {
    "event_id": "integer"
  }
  ```
- **Response:**
  - **201 Created:** Booking created successfully.
  - **400 Bad Request:** Validation errors.

### Get User Bookings
- **Endpoint:** `GET /bookings/user`
- **Description:** Retrieves all bookings for the authenticated user.
- **Response:**
  - **200 OK:** Returns an array of bookings.

### Get All Bookings (Admin)
- **Endpoint:** `GET /bookings/all`
- **Description:** Retrieves all bookings (Admin only).
- **Response:**
  - **200 OK:** Returns an array of all bookings.
  - **403 Forbidden:** Admin privileges required.

## Error Handling
All API responses will include an appropriate HTTP status code and a message indicating the success or failure of the request. 

## Conclusion
This API documentation provides a comprehensive overview of the endpoints available in the Local Event Booking System. For further details, please refer to the source code or contact the development team.