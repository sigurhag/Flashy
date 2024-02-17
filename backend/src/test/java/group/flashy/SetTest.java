package group.flashy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

public class SetTest {
    
    @Test
    public void testGetters(){
        Set set = new Set("name", "PU", 0);
        Set set1 = new Set("name", "PU", 0);

        assertEquals("name", set.getSetName());
        assertEquals(0, set.getSize());
        assertEquals("PU", set.getTheme());
        assertEquals(set1.getSetID() - set.getSetID(), 1);
    }

    @Test
    public void testSetTheme(){
        Set set = new Set("name", "PU", 0);

        set.setTheme("pu");
        assertEquals("pu", set.getTheme());
    }

    @Test
    public void testAddRemoveContainsCard(){
        Set set = new Set("name", "PU", 0);
        Card card = new Card(0, "name", "question", "answer");

        set.addCard(card);
        assertEquals(set.containsCard(card), true);
        set.removeCard(card);
        assertEquals(set.containsCard(card), false);

    }
}
