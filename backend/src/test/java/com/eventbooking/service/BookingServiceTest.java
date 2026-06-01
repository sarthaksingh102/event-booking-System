import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.eventbooking.model.Booking;
import com.eventbooking.model.Event;
import com.eventbooking.model.User;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class BookingServiceTest {

    @InjectMocks
    private BookingService bookingService;

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EventRepository eventRepository;

    private User user;
    private Event event;
    private Booking booking;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User(1L, "John Doe", "john@example.com", "password", "USER");
        event = new Event(1L, "Sample Event", "Description", "2023-10-01", "Location", 100);
        booking = new Booking(1L, user, event, "2023-09-30");
    }

    @Test
    public void testCreateBooking() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        Booking createdBooking = bookingService.createBooking(1L, 1L);

        assertNotNull(createdBooking);
        assertEquals(booking.getId(), createdBooking.getId());
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    public void testCreateBooking_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            bookingService.createBooking(1L, 1L);
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    public void testCreateBooking_EventNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            bookingService.createBooking(1L, 1L);
        });

        assertEquals("Event not found", exception.getMessage());
    }

    @Test
    public void testGetBookingByUser() {
        when(bookingRepository.findByUserId(1L)).thenReturn(List.of(booking));

        List<Booking> bookings = bookingService.getBookingsByUser(1L);

        assertNotNull(bookings);
        assertEquals(1, bookings.size());
        assertEquals(booking.getId(), bookings.get(0).getId());
    }
}