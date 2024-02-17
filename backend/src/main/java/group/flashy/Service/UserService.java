package group.flashy.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import group.flashy.Card;
import group.flashy.Set;
import group.flashy.User;

@Service 
public class UserService {

    private User loggedIn;
    
    private final DataSource dataSource;

    public UserService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /*
     * Må gjøre om userID slik at den velges i konstruktør-parameterne - og ikke genereres.
     */

    public boolean verifyLogIn(String username, String psw) {
        boolean succesfulLogin = false;
        String query = "SELECT * FROM user WHERE username = ?";
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, username);
                ResultSet resultSet = preparedStatement.executeQuery();
                if (resultSet.next()) {
                    String dbPsw = resultSet.getString("password");
                    if (dbPsw.equals(psw)) {
                        loggedIn = new User(username, psw,
                        resultSet.getString("email"),
                        resultSet.getBoolean("isAdmin"));
                        succesfulLogin = true;
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        return succesfulLogin;
    }

    /*
     * Her må User-klassen endres slik at evt. feilmeldinger eller beskjeder kommer fram til frontend.
     * Som det er nå gis det ingen beskjed og ingen feilmelding.
     * 
     * ID: Her må det genereres en ID for konstruktøren.
     */

    public boolean registerUser(String username, String psw, String email) {
        boolean validRegister = true;
        try {
            User registrant = new User(username, psw, email, false);
            loggedIn = registrant;
        } catch (Exception e) {
            validRegister = false;
        }
        return validRegister;
    }

    private Set findSetByID(ArrayList<Set> sets, int i) {
        for (Set set : sets) {
            if (set.getSetID() == i) {
                return set;
            }
        }
        return null;
    }

    /*
     * Rom for forbedringspotensiale med tanke på for-loopen (tror jeg)
     * Trenger også cardID for å ha en fremmednøkkel til set
     */
    
    public ArrayList<Set> getMySets() {
        ArrayList<Set> mySets = new ArrayList<>();
        String query = "SELECT * FROM 'Set' LEFT JOIN Card ON ('Set'.cardID = Card.cardID) WHERE userID = ?";
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, loggedIn.getUserID());
                ResultSet resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    Set crtSet = findSetByID(mySets, resultSet.getInt("setID"));
                    if (crtSet == null) {
                        Set set = new Set(resultSet.getString("setname"),
                        resultSet.getString("theme"),
                        loggedIn.getUserID());
                        mySets.add(set);
                    }
                    if (resultSet.getString("cardname").equals(null)) {
                        continue;
                    }
                    Card crtCard = new Card(resultSet.getInt("cardID"),
                    resultSet.getString("cardName"),
                    resultSet.getString("question"),
                    resultSet.getString("answer"));
                    crtSet.addCard(crtCard);
                }
                
            } catch (SQLException e) {
                e.printStackTrace();
            }
        return mySets;
    }

    public ArrayList<Set> getFavorites() {
        ArrayList<Set> myFavorites = new ArrayList<>();
        String query = "SELECT setID, setname, theme, cardname, cardID, cardName, question, answer FROM Favourite INNER JOIN 'Set' ON (Favourites.setID = 'Set'.setID) LEFT JOIN Card ON ('Set'.cardID = Card.cardID) WHERE userID = ?";
        try (Connection connection = dataSource.getConnection();
        PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, loggedIn.getUserID());
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Set crtSet = findSetByID(myFavorites, resultSet.getInt("setID"));
                    if (crtSet == null) {
                        Set set = new Set(resultSet.getString("setname"),
                        resultSet.getString("theme"),
                        loggedIn.getUserID());
                        myFavorites.add(set);
                    }
                    if (resultSet.getString("cardname").equals(null)) {
                        continue;
                    }
                    Card crtCard = new Card(resultSet.getInt("cardID"),
                    resultSet.getString("cardName"),
                    resultSet.getString("question"),
                    resultSet.getString("answer"));
                    crtSet.addCard(crtCard);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return myFavorites;
    }
}
