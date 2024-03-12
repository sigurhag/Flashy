
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
import java.util.UUID;
import group.flashy.Admin;
import group.flashy.Card;
import group.flashy.Set;
import group.flashy.User;

@Service
public class UserService {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase?user=generalUser&password=Flashy123";

    private User loggedIn; // Vil prøve å konsekvent bruke LoggedInUserID

    public static String LoggedInUserID;
    public static String setID;

    public static boolean isAdmin = false;

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
        String adminQuery = "SELECT * FROM admin WHERE username = ?";
        String userQuery = "SELECT * FROM user WHERE username = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement userStatement = connection.prepareStatement(userQuery);
                PreparedStatement adminStatement = connection.prepareStatement(adminQuery)) {
            userStatement.setString(1, username);
            ResultSet resultSet = userStatement.executeQuery();
            if (resultSet.next()) {
                String dbPsw = resultSet.getString("password");
                if (dbPsw.equals(psw)) {
                    LoggedInUserID = resultSet.getString("userID");
                    succesfulLogin = true;
                }
            }
            adminStatement.setString(1, username);
            ResultSet adminResultSet = adminStatement.executeQuery();
            if (adminResultSet.next()) {
                String dbPsw2 = adminResultSet.getString("password");
                if (dbPsw2.equals(psw)) {
                    LoggedInUserID = adminResultSet.getString("adminID");
                    succesfulLogin = true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return succesfulLogin;
    }

    /*
     * Her må User-klassen endres slik at evt. feilmeldinger eller beskjeder kommer
     * fram til frontend.
     * Som det er nå gis det ingen beskjed og ingen feilmelding.
     * 
     * Logger inn brukeren
     */
    public boolean registerUser(String username, String password1, String password2, String email) {
        boolean validRegister = false;
        if (password1.equals(password2)) {
            try {
                User registrant = new User(username, password1, email);
                registrant.saveUserToDatabase();
                LoggedInUserID = registrant.getUserID();
                validRegister = true;
            } catch (Exception e) {
                validRegister = false;
            }
        }
        return validRegister;
    }

    /**
     * Method for fetching user info from user or admin table
     * 
     * @param userID
     * @return
     */
    public ArrayList<String> getUserInfo(String userID) {
        ArrayList<String> userInfo = new ArrayList<>();
        String userQuery = "SELECT userID, username, email FROM user WHERE userID = ? " +
                "UNION " +
                "SELECT adminID, username, email FROM admin WHERE adminID = ?";
        try (Connection connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(userQuery)) {
            preparedStatement.setString(1, userID);
            preparedStatement.setString(2, userID);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    String userIDResult = resultSet.getString("userID");
                    String usernameResult = resultSet.getString("username");
                    String emailResult = resultSet.getString("email");
                    userInfo.add(usernameResult);
                    userInfo.add(emailResult);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userInfo;
    }

    public boolean checkISAdmin(String userID) {
        String query = "SELECT * FROM admin WHERE adminID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, userID);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                isAdmin = true;
                return true;
            }
            return false;
        } catch (SQLException e) {
            System.err.println("Error fetching admin rights");
        }
        return false;
    }

    public ArrayList<User> getAllUsers() {
        ArrayList<User> allUsers = new ArrayList<>();
        String query = "SELECT * FROM user";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String userID = resultSet.getString("userID");
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");
                String email = resultSet.getString("email");
                User user = new User(userID,username, password, email);
                allUsers.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return allUsers;
    }

    public boolean updateAdmin(String userID, String username, String password, String email) {
        String addQuery = "insert into admin values (?, ?, ?, ?)";
        String deleteQuery = "delete from user where userID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement addStatement = connection.prepareStatement(addQuery);
                PreparedStatement deleteStatement = connection.prepareStatement(deleteQuery)) {
            addStatement.setString(1, userID);
            addStatement.setString(2, username);
            addStatement.setString(3, password);
            addStatement.setString(4, email);
            int addResult = addStatement.executeUpdate();
            if (addResult > 0) {
                deleteStatement.setString(1, userID);
                int deleteResult = deleteStatement.executeUpdate();
                if (deleteResult > 0) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
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
        String query = "SELECT * FROM `Set` WHERE userID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, LoggedInUserID);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                String userID = resultSet.getString("userID");
                String theme = resultSet.getString("theme");
                String setname = resultSet.getString("setname");
                int likes = resultSet.getInt("likes");
                Set set = new Set(setID, setname, theme, userID, likes);
                mySets.add(set);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return mySets;
    }

    public ArrayList<Set> getMostPopular() {
        ArrayList<Set> mostPopular = new ArrayList<>();
        String query = "SELECT * FROM `Set` ORDER BY likes DESC";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                String userID = resultSet.getString("userID");
                String theme = resultSet.getString("theme");
                String setname = resultSet.getString("setname");
                int likes = resultSet.getInt("likes");
                Set set = new Set(setID, setname, theme, userID, likes);
                mostPopular.add(set);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return mostPopular;
    }

    public ArrayList<Set> getFavorites() {
        ArrayList<Set> myFavorites = new ArrayList<>();
        String query = "SELECT * FROM `Set` WHERE setID IN (SELECT setID FROM `Set` WHERE userID = ?)";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, LoggedInUserID);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                String userID = resultSet.getString("userID");
                String theme = resultSet.getString("theme");
                String setname = resultSet.getString("setname");
                int likes = resultSet.getInt("likes");
                Set set = new Set(setID, setname, theme, userID, likes);
                myFavorites.add(set);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return myFavorites;
    }

    // This method takes in changes username of LoggedInUser
    public boolean changeUsername(String newUsername) {
        String query = "UPDATE User SET username = ? WHERE userID = ?";
        try (Connection connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, newUsername);
            preparedStatement.setString(2, LoggedInUserID);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0; // If any changes were made, return true
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // This method takes in changes email of LoggedInUser
    public boolean changeEmail(String newEmail) {
        String query = "UPDATE User SET email = ? WHERE userID = ?";
        try (Connection connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, newEmail);
            preparedStatement.setString(2, LoggedInUserID);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0; // If any changes were made, return true
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // This method takes in changes password of LoggedInUser
    public boolean changePassword(String newPassword) {
        String query = "UPDATE User SET password = ? WHERE userID = ?";
        try (Connection connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, newPassword);
            preparedStatement.setString(2, LoggedInUserID);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0; // If any changes were made, return true
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean saveSetToDatabase(String setname, int size, String theme, String LoggedInUserID) {
        setID = UUID.randomUUID().toString();
        int likes = 0;
        String query = "INSERT INTO `Set` (setID, setname, size, theme, likes, userID) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, setID);
            preparedStatement.setString(2, setname);
            preparedStatement.setInt(3, size);
            preparedStatement.setString(4, theme);
            preparedStatement.setInt(5, likes);
            preparedStatement.setString(6, LoggedInUserID);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean saveCardToDatabase(String question, String answer) {
        String cardID = UUID.randomUUID().toString();
        boolean isDifficult = false;
        String query = "INSERT INTO card (cardID, question, answer, SetID, isDifficult) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, cardID);
            preparedStatement.setString(2, question);
            preparedStatement.setString(3, answer);
            preparedStatement.setString(4, setID);
            preparedStatement.setBoolean(5, isDifficult);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static void main(String[] args) {
        UserService test = new UserService(null);
    }
}