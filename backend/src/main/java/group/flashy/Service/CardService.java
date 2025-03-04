package group.flashy.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import org.springframework.stereotype.Service;

import group.flashy.Card;
import group.flashy.Set;

@Service
public class CardService {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase?user=generalUser&password=Flashy123";

    private final DataSource dataSource;

    public CardService(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    /*
     * A very basic search engine that takes in the title of the set
     */
    public ArrayList<Set> searchEngine(String searchWord) {
        ArrayList<Set> relevantSets = new ArrayList<Set>();
        String query = "SELECT setname FROM 'Set' LEFT JOIN Card ON ('Set'.cardID = Card.cardID)";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
         PreparedStatement preparedStatement = connection.prepareStatement(query)) {
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            if (resultSet.getString("setname").toLowerCase().contains(searchWord.toLowerCase())) {
                Set set = new Set(resultSet.getString("setname"),
                        resultSet.getString("theme"),
                        resultSet.getString("userID"),
                        resultSet.getInt("likes"));
                relevantSets.add(set);
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
        return relevantSets;
    }

    public boolean createCard(String setID, String question, String answer) {
        try {
            Card card = new Card(setID, question, answer);
            card.saveCardToDatabase();
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean deleteCard(String cardID) {
        String query = "DELETE FROM Card WHERE card_id = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
        PreparedStatement deleteStatement = connection.prepareStatement(query)) {
            deleteStatement.setString(1, cardID);
            int rowsAffected = deleteStatement.executeUpdate();
            if (rowsAffected == 0) {
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    public ArrayList<Card> accessCard(String setID) {
        ArrayList<Card> correspondingCards = new ArrayList<Card>();
        String query = "SELECT * FROM card WHERE setID =?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
         PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, setID);
            ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            Card cardInst = new Card(setID,
            resultSet.getString("question"),
            resultSet.getString("answer"));
            correspondingCards.add(cardInst);
        }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("HHELLLOOO");
        }
        return correspondingCards;
    }


}
