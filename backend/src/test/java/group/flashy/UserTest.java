package group.flashy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;

public class UserTest {

    @Test
    public void testConstructorWithInvalidUsername() {
        String username = "usr";
        String password = "testpassword";
        String email = "test@gmail.com";
        
        try {
            new User(username, password, email);
            assert false;
        } catch (IllegalArgumentException e) {
            assert true;
        }
    }

    @Test
    public void testConstructorWithInvalidPassword() {
        String username = "testuser";
        String password = "pwd";
        String email = "test@gmail.com";
        
        try {
            new User(username, password, email);
            assert false;
        } catch (IllegalArgumentException e) {
            assert true;
        }
    }

    @Test
    public void testConstructorWithInvalidEmail() {
        String username = "testuser";
        String password = "testpassword";
        String email = "invalidemail";
        
        try {
            new User(username, password, email);
            assert false;
        } catch (IllegalArgumentException e) {
            assert true;
        }
    }

    @Test
    public void testConstructorWithValidArguments() {
        String username = "testUser";
        String password = "testPassword";
        String email = "test@gmail.com";

        User user = new User(username, password, email);

        assertNotNull(user);
        assertEquals(username, getFieldFromToString(user.toString(), "username"));
        assertEquals(password + "]", getFieldFromToString(user.toString(), "password"));
        assertEquals(email, getFieldFromToString(user.toString(), "email"));
    }

    private String getFieldFromToString(String toStringOutput, String fieldName) {
        String[] fields = toStringOutput.split(",");
        for (String field : fields) {
            String[] parts = field.trim().split("=");
            if (parts.length == 2 && parts[0].equals(fieldName)) {
                return parts[1];
            }
        }
        return null;
    }
}