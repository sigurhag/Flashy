package group.flashy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
 
public class CardTest {

    @Test
    public void testGetters(){
        Card card = new Card(0, "name", "question", "answer");
        Card card1 = new Card(0,"name", "question", "answer");
        assertEquals("name", card.getCardName());
        assertEquals("question", card.getQuestion());
        assertEquals("answer", card.getAnswer());
        assertEquals(card1.getCardID() - card.getCardID(), 1);
        assertEquals(false, card.getIsDifficult());

    }

    @Test
    public void testEdit(){
        Card card = new Card(0,"name", "question", "answer");
        card.editAnswer("test");
        assertEquals("test", card.getAnswer());
        card.editQuestion("test");
        assertEquals("test", card.getQuestion());
    }

    @Test
    public void testDifficulty(){
        Card card = new Card(0,"name", "question", "answer");
        card.changeDifficult();
        assertEquals(true, card.getIsDifficult());
        card.changeDifficult();
        assertEquals(false, card.getIsDifficult());
    }
}
