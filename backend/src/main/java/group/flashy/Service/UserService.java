package group.flashy.Service;

import javax.sql.DataSource;

import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.stereotype.Service;

import group.flashy.Card;
import group.flashy.Set;
import group.flashy.User;

@Service 
public class UserService {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase?username=generalUser&password=Flashy123";

    private User loggedIn;

    public static String LoggedInUserID;
    
    private final DataSource dataSource;

    public UserService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /*
     * Sjekker at innloggingsinformasjonen er riktig
     * Hvis ikke returneres false
     */

    public boolean verifyLogIn(String username, String psw) {
        boolean succesfulLogin = false;
        String query = "SELECT * FROM user WHERE username = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, username);
                ResultSet resultSet = preparedStatement.executeQuery();
                if (resultSet.next()) {
                    String dbPsw = resultSet.getString("password");
                    if (dbPsw.equals(psw)) {
                        LoggedInUserID = resultSet.getString("userID");
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
     * Logger inn brukeren
     */

    public boolean registerUser(String username, String password1, String password2, String email) {
        boolean validRegister = false;
        if(password1.equals(password2)) {
        try {
            User registrant = new User(username, password1, email);
            LoggedInUserID = registrant.getUserID();
            validRegister = true;
        } catch (Exception e) {
            validRegister = false;
        }
        }
        return validRegister;
    }

    private Set findSetByID(ArrayList<Set> sets, String setID) {
        for (Set set : sets) {
            if (set.getSetID().equals(setID)) {
                return set;
            }
        }
        return null;
    }

    /*
     * Trenger også cardID for å ha en fremmednøkkel til set
     */
    
    public ArrayList<Set> getMySets() {
        ArrayList<Set> mySets = new ArrayList<>();
        String query = "SELECT * FROM ´Set´ LEFT JOIN Card ON (´Set´.cardID = Card.cardID) WHERE userID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, loggedIn.getUserID());
                ResultSet resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String setID = resultSet.getString("setID");
                    Set crtSet = findSetByID(mySets, setID);
                    if (crtSet == null) {
                        Set set = new Set(resultSet.getString("setname"),
                        resultSet.getString("theme"),
                        LoggedInUserID);
                        mySets.add(set);
                    }
                    if (resultSet.getString("cardname").equals(null)) {
                        continue;
                    }
                    Card crtCard = new Card(setID,
                    resultSet.getString("cardName"),
                    resultSet.getString("question"),
                    resultSet.getString("answer"));
                    crtSet.addCardToSet(crtCard);
                }
                
            } catch (SQLException e) {
                e.printStackTrace();
            }
        return mySets;
    }

    public ArrayList<Set> getFavorites() {
        ArrayList<Set> myFavorites = new ArrayList<>();
        String query = "SELECT setID, setname, theme, cardname, cardID, cardName, question, answer FROM Favourite INNER JOIN 'Set' ON (Favourites.setID = 'Set'.setID) LEFT JOIN Card ON ('Set'.cardID = Card.cardID) WHERE userID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
        PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, loggedIn.getUserID());
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                Set crtSet = findSetByID(myFavorites, setID);
                    if (crtSet == null) {
                        Set set = new Set(resultSet.getString("setname"),
                        resultSet.getString("theme"),
                        LoggedInUserID);
                        myFavorites.add(set);
                    }
                    if (resultSet.getString("cardname").equals(null)) {
                        continue;
                    }
                    Card crtCard = new Card(setID,
                    resultSet.getString("cardName"),
                    resultSet.getString("question"),
                    resultSet.getString("answer"));
                    crtSet.addCardToSet(crtCard);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return myFavorites;
    }

    //This method need to be updated to request from the DB
    public ArrayList<String> getUserInfo(String userID) {
        ArrayList<String> userInfo = new ArrayList<>(); 
        String query = "SELECT userID, username, email  FROM user WHERE userID = ?";
        try(Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1,userID);
                try(ResultSet resultSet = preparedStatement.executeQuery()) {
                    if(resultSet.next()) {
                        String userIDResult = resultSet.getString("userID");
                        String usernameResult = resultSet.getString("username");
                        String emailResult = resultSet.getString("email");
                        userInfo.add(usernameResult);
                        userInfo.add(emailResult);
                    }
                } 
            }
            catch(SQLException e) {
                e.printStackTrace();
            }
        return userInfo;
    }

    public static void main(String[] args) {
        UserService test = new UserService(null);
    }
}
