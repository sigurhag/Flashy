package group.flashy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

public class SetTest {

    @Test
    public void testConstructorWithValidArguments() {
        String setname = "Test Set";
        String theme = "Test Theme";
        String userID = "testUser123";
        int likes = 5;
        
        Set set = new Set(setname, theme, userID, likes);
        
        assertNotNull(set);
        assertEquals(setname, extractField(set.toString(), "setname"));
        assertEquals(theme, extractField(set.toString(), "theme"));
        assertEquals(userID, extractField(set.toString(), "userID"));
        assertEquals("0", extractField(set.toString(), "size")); // Assuming size is an int converted to String
        assertEquals(Integer.toString(likes), extractField(set.toString(), "likes"));
    }

    @Test
    public void testConstructorWithSetID() {
        String setID = "123456";
        String setname = "Test Set";
        String theme = "Test Theme";
        String userID = "testUser123";
        int likes = 5;
        int size = 10;
        
        Set set = new Set(setID, setname, theme, userID, likes, size);
        
        assertNotNull(set);
        assertEquals(setname, extractField(set.toString(), "setname"));
        assertEquals(theme, extractField(set.toString(), "theme"));
        assertEquals(userID, extractField(set.toString(), "userID"));
        assertEquals(Integer.toString(size), extractField(set.toString(), "size"));
        assertEquals(Integer.toString(likes), extractField(set.toString(), "likes"));
    }

    @Test
    public void testConstructorWithSetIDAndOwner() {
        String setID = "123456";
        String setname = "Test Set";
        String theme = "Test Theme";
        String userID = "testUser123";
        int likes = 5;
        int size = 10;
        String owner = "Test Owner";
        
        Set set = new Set(setID, setname, theme, userID, likes, size, owner);
        
        assertNotNull(set);
        assertEquals(setname, extractField(set.toString(), "setname"));
        assertEquals(theme, extractField(set.toString(), "theme"));
        assertEquals(userID, extractField(set.toString(), "userID"));
        assertEquals(Integer.toString(size), extractField(set.toString(), "size"));
        assertEquals(Integer.toString(likes), extractField(set.toString(), "likes"));
        assertEquals(owner + "]", extractField(set.toString(), "owner"));
    }

    // Method to extract field value from toString() output
    private String extractField(String toStringOutput, String fieldName) {
        // Assuming the toString output format is "fieldName=value,fieldName=value,..."
        String[] fields = toStringOutput.split(",");
        for (String field : fields) {
            String[] parts = field.split("=");
            if (parts.length == 2 && parts[0].trim().equals(fieldName)) {
                return parts[1].trim();
            }
        }
        return null; // Field not found
    }
}
