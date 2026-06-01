package com.eventbooking.dto;

import java.time.LocalDateTime;

public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime date;
    private String location;
    private int capacity;

    public EventDTO() {
    }

    public EventDTO(Long id, String title, String description, LocalDateTime date, String location, int capacity) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.capacity = capacity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}