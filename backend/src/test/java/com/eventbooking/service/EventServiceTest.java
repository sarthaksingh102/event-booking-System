import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.eventbooking.model.Event;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class EventServiceTest {

    @InjectMocks
    private EventService eventService;

    @Mock
    private EventRepository eventRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllEvents() {
        Event event1 = new Event(1L, "Event 1", "Description 1", "2023-10-01", "Location 1", 100);
        Event event2 = new Event(2L, "Event 2", "Description 2", "2023-10-02", "Location 2", 200);
        List<Event> events = Arrays.asList(event1, event2);

        when(eventRepository.findAll()).thenReturn(events);

        List<Event> result = eventService.getAllEvents();

        assertEquals(2, result.size());
        assertEquals("Event 1", result.get(0).getTitle());
        assertEquals("Event 2", result.get(1).getTitle());
    }

    @Test
    public void testGetEventById() {
        Event event = new Event(1L, "Event 1", "Description 1", "2023-10-01", "Location 1", 100);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        Event result = eventService.getEventById(1L);

        assertNotNull(result);
        assertEquals("Event 1", result.getTitle());
    }

    @Test
    public void testGetEventById_NotFound() {
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            eventService.getEventById(1L);
        });

        assertEquals("Event not found", exception.getMessage());
    }

    @Test
    public void testCreateEvent() {
        Event event = new Event(null, "New Event", "New Description", "2023-10-03", "New Location", 150);
        when(eventRepository.save(event)).thenReturn(new Event(1L, "New Event", "New Description", "2023-10-03", "New Location", 150));

        Event createdEvent = eventService.createEvent(event);

        assertNotNull(createdEvent.getId());
        assertEquals("New Event", createdEvent.getTitle());
    }

    @Test
    public void testUpdateEvent() {
        Event existingEvent = new Event(1L, "Existing Event", "Existing Description", "2023-10-01", "Existing Location", 100);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(existingEvent));

        Event updatedEvent = new Event(1L, "Updated Event", "Updated Description", "2023-10-01", "Updated Location", 100);
        when(eventRepository.save(updatedEvent)).thenReturn(updatedEvent);

        Event result = eventService.updateEvent(1L, updatedEvent);

        assertEquals("Updated Event", result.getTitle());
    }

    @Test
    public void testDeleteEvent() {
        Event event = new Event(1L, "Event to Delete", "Description", "2023-10-01", "Location", 100);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        eventService.deleteEvent(1L);

        verify(eventRepository, times(1)).delete(event);
    }
}