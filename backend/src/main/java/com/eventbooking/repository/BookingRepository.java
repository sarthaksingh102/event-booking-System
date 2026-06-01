package com.eventbooking.repository;

import com.eventbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    java.util.List<Booking> findByUserId(Long userId);
    java.util.List<Booking> findByEventId(Long eventId);
}