package com.eventbooking.service;

import com.eventbooking.model.Event;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + id));
        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setLocation(eventDetails.getLocation());
        event.setCapacity(eventDetails.getCapacity());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + id));
        eventRepository.delete(event);
    }
}