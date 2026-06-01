package com.eventbooking.dto;

import java.time.LocalDateTime;

public class BookingDTO {
    private Long id;
    private Long userId;
    private Long eventId;
    private LocalDateTime bookingDate;

    public BookingDTO() {
    }

    public BookingDTO(Long id, Long userId, Long eventId, LocalDateTime bookingDate) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.bookingDate = bookingDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
}