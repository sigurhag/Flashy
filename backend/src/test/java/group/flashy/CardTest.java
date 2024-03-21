package group.flashy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

public class CardTest {

    @Test
    public void testConstructorWithValidArguments() {
        String setID = "d29db219-e8c6-4a06-9d25-854854d99341";
        String question = "Test question";
        String answer = "Test answer";

        Card card = new Card(setID, question, answer);

        assertNotNull(card);
        assertEquals(setID + "]", getFieldFromToString(card.toString(), "setID"));
        assertEquals(question, getFieldFromToString(card.toString(), "question"));
        assertEquals(answer, getFieldFromToString(card.toString(), "answer"));
        assertEquals("false", getFieldFromToString(card.toString(), "isDifficult")); // Assuming isDifficult is initialized to false
    }

    @Test
    public void testConstructorWithCardID() {
        String cardID = "123456";
        String setID = "d29db219-e8c6-4a06-9d25-854854d99341";
        String question = "Test question";
        String answer = "Test answer";
        boolean isDifficult = true;

        Card card = new Card(cardID, question, answer, setID, isDifficult);

        assertNotNull(card);
        assertEquals(setID + "]", getFieldFromToString(card.toString(), "setID"));
        assertEquals(question, getFieldFromToString(card.toString(), "question"));
        assertEquals(answer, getFieldFromToString(card.toString(), "answer"));
        assertEquals("true", getFieldFromToString(card.toString(), "isDifficult"));
    }

    private String getFieldFromToString(String toStringOutput, String fieldName) {
        String[] fields = toStringOutput.split(",");
        for (String field : fields) {
            String[] parts = field.trim().split("=");
            if (parts.length == 2 && parts[0].trim().equals(fieldName)) {
                return parts[1].trim();
            }
        }
        return null; 
    }
}