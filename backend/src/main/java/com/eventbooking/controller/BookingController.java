package com.eventbooking.controller;

import com.eventbooking.model.Booking;
import com.eventbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(createdBooking);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Booking>> getUserBookings(@RequestParam Long userId) {
        List<Booking> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}