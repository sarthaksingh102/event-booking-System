import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.eventbooking.model.User;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1L);
        user.setName("John Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("password");
        user.setRole("USER");
    }

    @Test
    public void testRegisterUser() {
        when(userRepository.save(any(User.class))).thenReturn(user);
        User registeredUser = userService.registerUser(user);
        assertNotNull(registeredUser);
        assertEquals("John Doe", registeredUser.getName());
    }

    @Test
    public void testFindUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        User foundUser = userService.findUserById(1L);
        assertNotNull(foundUser);
        assertEquals("john.doe@example.com", foundUser.getEmail());
    }

    @Test
    public void testFindUserById_NotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());
        User foundUser = userService.findUserById(2L);
        assertNull(foundUser);
    }

    @Test
    public void testUpdateUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        user.setName("Jane Doe");
        when(userRepository.save(any(User.class))).thenReturn(user);
        User updatedUser = userService.updateUser(1L, user);
        assertNotNull(updatedUser);
        assertEquals("Jane Doe", updatedUser.getName());
    }

    @Test
    public void testDeleteUser() {
        doNothing().when(userRepository).deleteById(1L);
        userService.deleteUser(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }
}