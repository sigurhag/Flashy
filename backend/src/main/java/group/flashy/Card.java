package group.flashy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Class for the flashcards.
 */
public class Card {
    // Field for DB connection
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase";

    // Fields for the Card object
    private static int nextCardID = 1; // static value for nextCardID
    private int cardID;
    private String cardName;
    private String question;
    private String answer;
    private int userID;
    private boolean isDifficult;

    /**
     * Contructor for the card.
     *
     * @param userID   key to the user which the card belongs to
     * @param cardName The name of the card
     * @param question The question on the card
     * @param answer   The answer to the question
     */
    public Card(int userID, String cardName, String question, String answer) {
        this.cardID = nextCardID++;
        this.cardName = cardName;
        this.question = question;
        this.answer = answer;
        this.isDifficult = false;
        this.userID = userID;
        saveCardToDatabase();
    }

    /**
     * Method for updating the difficulty of a question.
     *
     * @param difficult boolean on is difficult
     */
    public void changeDifficult(boolean difficult) {
        updateCardInfo(difficult, difficult);
    }

    /**
     * Method for editing the answer to a question.
     *
     * @param answer The new answer to the question
     */
    public void editAnswer(String answer) {
        updateCardInfo(answer, answer);
    }

    /**
     * Method for editing the question on a card.
     *
     * @param question the new question
     */
    public void editQuestion(String question) {
        updateCardInfo(question, question);
    }

    /**
     * Method for retriving CardID of a card.
     *
     * @return the ID
     */
    public int getCardID() {
        return (int) getCardInfo(cardID);
    }

    /**
     * Method for retriving the name of the card.
     *
     * @return the name
     */
    public String getCardName() {
        return (String) getCardInfo(cardName);
    }

    /**
     * Method for retriving the question on a card.
     *
     * @return the question.
     */
    public String getQuestion() {
        return (String) getCardInfo(question);
    }

    /**
     * Method for retriving the answer on a card.
     *
     * @return the answer
     */
    public String getAnswer() {
        return (String) getCardInfo(answer);
    }

    /**
     * Method for retriving the UserID who own the card.
     *
     * @return the userID
     */
    public int getCardUserID() {
        return (int) getCardInfo(userID);
    }

    /**
     * Method for checking if a card is difficult.
     *
     * @return true or false on card is difficult
     */
    public boolean getIsDifficult() {
        return (boolean) getCardInfo(isDifficult);
    }

    /**
     * Method for getting data on a card from DB.
     *
     * @param field which field to get data on
     * @return return the requested data
     */
    public Object getCardInfo(Object field) {
        Object value = null;
        String query = "SELECT " + field + " FROM card WHERE cardID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, cardID);
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
            String query = "INSERT INTO card (cardID, cardName, question, answer, userID, isDifficult) VALUES(?,?,?,?,?,?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, cardID);
                preparedStatement.setString(2, cardName);
                preparedStatement.setString(3, question);
                preparedStatement.setString(4, answer);
                preparedStatement.setInt(5, userID);
                preparedStatement.setBoolean(6, isDifficult);
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
    public void updateCardInfo(Object field, Object newValue) {
        switch (field) {
            case "answer":
                this.answer = (String) newValue;
                break;
            case "question":
                this.question = (String) newValue;
                break;
            case "difficult":
                this.difficult = (boolean) newValue;
                break;
            default:
                throw new IllegalArgumentException(field + " is not a field which support updating!");
        }
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "UPDATE card SET " + field + " = ? WHERE cardID = ?";
            try (PreparedStatement updateStatement = connection.prepareStatement(query)) {
                updateStatement.setObject(1, newValue);
                updateStatement.setInt(2, cardID);
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
        return "Card [cardID= " + cardID + ", cardName= " + cardName + ", question= " + question + ", answer= " + answer
                + ", isDifficult= " + isDifficult + ", userID= " + userID + "]";
    }

    /**
     * Main method for this class.
     *
     * @param args the args of the method
     */
    public static void main(String[] args) {
    }

}
