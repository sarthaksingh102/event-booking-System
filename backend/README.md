# Local Event Booking System - Backend

## Overview
The Local Event Booking System is a modern full-stack web application designed to facilitate the browsing, registration, and booking of tickets for local events. This backend component is built using Spring Boot and provides a RESTful API for the frontend application.

## Getting Started

### Prerequisites
- Java 11 or higher
- Maven
- MySQL Database

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/local-event-booking-system.git
   ```
2. Navigate to the backend directory:
   ```
   cd local-event-booking-system/backend
   ```
3. Update the `application.properties` file with your database credentials.

4. Build the project using Maven:
   ```
   mvn clean install
   ```

5. Run the application:
   ```
   mvn spring-boot:run
   ```

### API Documentation
Refer to the [API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md) for detailed information on the available endpoints and their usage.

## Features
- User authentication with JWT
- Event management for admins
- Ticket booking system
- Email notifications for bookings
- Role-based access control

## Testing
Unit tests are included in the project. To run the tests, use:
```
mvn test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Spring Boot for the backend framework
- MySQL for the database
- React for the frontend application

## Contact
For any inquiries, please contact [your-email@example.com].