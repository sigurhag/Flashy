package group.flashy.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import org.springframework.stereotype.Service;

import group.flashy.Set;

@Service
public class CardService {
    

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
        try (Connection connection = dataSource.getConnection();
         PreparedStatement preparedStatement = connection.prepareStatement(query)) {
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            if (resultSet.getString("setname").toLowerCase().contains(searchWord.toLowerCase())) {
                Set set = new Set(resultSet.getString("setname"),
                        resultSet.getString("theme"),
                        resultSet.getInt("userID"));
                relevantSets.add(set);
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
        return relevantSets;
    }
}
