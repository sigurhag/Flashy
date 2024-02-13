package test.java.group.flashy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.beans.Transient;

import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.BeforeEach;
import main.java.group.flashy.User;

/**
 * This class contains unit test for the User class.
 */
public class UserTest {
    private User user;
    private User user2;

    @BeforeEach
    public void setUp() {
         user = new User("TestPerson", "TestPassword123", "Test@gmail.com", false);
         user2 = new User("TestPerson", "TestPassword123", "Test@gmail.com", false);
    }

    @Test
    public void testGetters() {
        assertEquals("TestPerson", user.getUsername());
        assertEquals("TestPassword123", user.getPassword());
        assertEquals(1, user.getUserID());
        assertEquals("Test@gmail.com", user.getEmail());
        assertEquals(false, user.isAdmin());
        assertEquals(2, user2.getUserID());
    }

    @Test
    public void testSetters() {
        user.setIsAdmin();
        user.setUsername("John Doe");
        assertEquals("John Doe", user.getUsername());
        assertEquals(true, user.isAdmin());
    }
}
