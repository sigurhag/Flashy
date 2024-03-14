package group.flashy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

/**
 * Class for the flashcards.
 */
public class Card {
    // Field for DB connection
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase?user=generalUser&password=Flashy123";

    // Fields for the Card object
    private String cardID;
    private String question;
    private String answer;
    private String setID;
    private boolean isDifficult;

    /**
     * Contructor for the card.
     *
     * @param setID   key to the set which the card belongs to
     * @param cardName The name of the card
     * @param question The question on the card
     * @param answer   The answer to the question
     */
    public Card(String setID, String question, String answer) {
        this.cardID = UUID.randomUUID().toString();
        this.question = question;
        this.answer = answer;
        this.isDifficult = false;
        this.setID = setID;
    }

    public Card(String cardID, String question, String answer, String setID, Boolean isDifficult) {
        this.cardID = cardID;
        this.question = question;
        this.answer = answer;
        this.setID = setID;
        this.isDifficult = isDifficult;
    }

    /**
     * Method for updating the difficulty of a question.
     *
     * @param difficult boolean on is difficult
     */
    public void changeDifficult(boolean difficult) {
        updateCardInfo("isDifficult", difficult);
    }

    /**
     * Method for editing the answer to a question.
     *
     * @param answer The new answer to the question
     */
    public void editAnswer(String answer) {
        updateCardInfo("answer", answer);
    }

    /**
     * Method for editing the question on a card.
     *
     * @param question the new question
     */
    public void editQuestion(String question) {
        updateCardInfo("question", question);
    }

    /**
     * Method for retriving CardID of a card.
     *
     * @return the ID
     */
    public String getCardID() {
        return (String) getCardInfo("cardID");
    }

    /**
     * Method for retriving the question on a card.
     *
     * @return the question.
     */
    public String getQuestion() {
        return (String) getCardInfo("question");
    }

    /**
     * Method for retriving the answer on a card.
     *
     * @return the answer
     */
    public String getAnswer() {
        return (String) getCardInfo("answer");
    }

    /**
     * Method for retriving the SetID who own the card.
     *
     * @return the setID
     */
    public String getCardSetID() {
        return (String) getCardInfo("setID");
    }

    /**
     * Method for checking if a card is difficult.
     *
     * @return true or false on card is difficult
     */
    public boolean getIsDifficult() {
        return (boolean) getCardInfo("isDifficult");
    }

    /**
     * Method for getting data on a card from DB.
     *
     * @param field which field to get data on
     * @return return the requested data
     */
    public Object getCardInfo(String field) {
        Object value = null;
        String query = "SELECT " + field + " FROM card WHERE cardID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, cardID);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    if (resultSet.next()) {
                        value = resultSet.getObject(field);
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
        return value;
    }

    /**
     * Method for adding a new card to the DB.
     */
    public void saveCardToDatabase() {
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "INSERT INTO card (cardID, question, answer, setID, isDifficult) VALUES(?,?,?,?,?,?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, cardID);
                preparedStatement.setString(2, question);
                preparedStatement.setString(3, answer);
                preparedStatement.setString(4, setID);
                preparedStatement.setBoolean(5, isDifficult);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    /**
     * Method for updating info on a card.
     * @param field which field to update
     * @param newValue the new value of the field
     */
    public void updateCardInfo(String field, Object newValue) {
        switch (field) {
            case "answer":
                this.answer = (String) newValue;
                break;
            case "question":
                this.question = (String) newValue;
                break;
            case "difficult":
                this.isDifficult = (boolean) newValue;
                break;
                case "setID":
                this.setID = (String) newValue;
                break;
            default:
                throw new IllegalArgumentException(field + " is not a field which support updating!");
        }
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "UPDATE card SET " + field + " = ? WHERE cardID = ?";
            try (PreparedStatement updateStatement = connection.prepareStatement(query)) {
                updateStatement.setObject(1, newValue);
                updateStatement.setString(2, cardID);
                updateStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    /**
     * toString method for the class.
     */
    @Override
    public String toString() {
        return "Card [cardID= " + cardID + ", question= " + question + ", answer= " + answer
                + ", isDifficult= " + isDifficult + ", setID= " + setID + "]";
    }

    /**
     * Main method for this class.
     *
     * @param args the args of the method
     */
    public static void main(String[] args) {

    }
        

}
