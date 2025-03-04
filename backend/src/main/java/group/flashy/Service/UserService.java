
package group.flashy.Service;

import javax.sql.DataSource;

import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.List;
import org.json.JSONObject;

import org.springframework.stereotype.Service;
import java.util.UUID;
import group.flashy.Admin;
import group.flashy.Card;
import group.flashy.Set;
import group.flashy.User;
import netscape.javascript.JSObject;

@Service
public class UserService {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase?user=generalUser&password=Flashy123";

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
                    userInfo.add(userIDResult);
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
                User user = new User(userID, username, password, email);
                allUsers.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return allUsers;
    }

    public ArrayList<Set> getMySets() {
        ArrayList<Set> mySets = new ArrayList<>();
        String query = "SELECT s.*, u.username AS username FROM `Set` AS s JOIN user AS u ON (u.userID=s.userID) WHERE s.userID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, LoggedInUserID);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                String userID = resultSet.getString("userID");
                String theme = resultSet.getString("theme");
                String setname = resultSet.getString("setname");
                String owner = resultSet.getString("username");
                int likes = resultSet.getInt("likes");
                int size = resultSet.getInt("size");
                Set set = new Set(setID, setname, theme, userID, likes, size, owner);
                mySets.add(set);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return mySets;
    }

    public ArrayList<Set> getMostPopular() {
        ArrayList<Set> mostPopular = new ArrayList<>();
        String query = "SELECT s.*, u.username FROM `Set` AS s INNER JOIN user AS u ON (s.userID=u.userID) ORDER BY likes DESC";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                String userID = resultSet.getString("userID");
                String theme = resultSet.getString("theme");
                String setname = resultSet.getString("setname");
                int likes = resultSet.getInt("likes");
                int size = resultSet.getInt("size");
                String owner = resultSet.getString("u.username");
                Set set = new Set(setID, setname, theme, userID, likes, size, owner);
                mostPopular.add(set);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return mostPopular;
    }

    public ArrayList<Set> getFavorites() {
        ArrayList<Set> myFavorites = new ArrayList<>();
        String query = "SELECT s.*, u.username " +
                "FROM Favourite AS f " +
                "INNER JOIN `Set` AS s ON f.setID = s.setID " +
                "INNER JOIN user AS u ON s.userID = u.userID " +
                "WHERE f.userID = ?";
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
                int size = resultSet.getInt("size");
                String owner = resultSet.getString("u.username");
                Set set = new Set(setID, setname, theme, userID, likes, size, owner);
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

    public boolean removeSet(String setIDObject) {
        JSONObject jsonObject = new JSONObject(setIDObject);
        String setID = jsonObject.getString("setID");
        System.out.println(setID);
        String favoriteQuery = "DELETE FROM Favourite WHERE setID = ?";
        String cardQuery = "DELETE FROM card WHERE setID = ?";
        String setQuery = "DELETE FROM `Set` WHERE setID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement cardStatement = connection.prepareStatement(cardQuery);
                PreparedStatement setStatement = connection.prepareStatement(setQuery);
                PreparedStatement favouriteStatement = connection.prepareStatement(favoriteQuery)) {
            cardStatement.setString(1, setID);
            setStatement.setString(1, setID);
            favouriteStatement.setString(1, setID);
            int deleteFavourite = favouriteStatement.executeUpdate();
            int deleteCards = cardStatement.executeUpdate();
            int deleteSets = setStatement.executeUpdate();
            return deleteCards >= 1 && deleteSets == 1 && deleteFavourite >= 1;
        } catch (SQLException e) {
            System.err.println(e);
            return false;
        }
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

    public Set getSet(String setIDObject) {
        JSONObject jsonObject = new JSONObject(setIDObject);
        String setID = jsonObject.getString("setID");
        String query = "SELECT s.*, u.username FROM `Set` AS s INNER JOIN user AS u ON (s.userID=u.userID)WHERE setID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, setID);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String userID = resultSet.getString("userID");
                String theme = resultSet.getString("theme");
                String setName = resultSet.getString("setname");
                int likes = resultSet.getInt("likes");
                int size = resultSet.getInt("size");
                Set set = new Set(setID, setName, theme, userID, likes, size);
                return set;
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
        return null;
    }

    public ArrayList<Card> getCards(String setID) {
        ArrayList<Card> cards = new ArrayList<>();
        String query = "SELECT * FROM card WHERE setID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, setID);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String cardID = resultSet.getString("cardID");
                String question = resultSet.getString("question");
                String answer = resultSet.getString("answer");
                Boolean isDifficult = resultSet.getBoolean("isDifficult");
                Card card = new Card(cardID, question, answer, setID, isDifficult);
                cards.add(card);
            }
            return cards;
        } catch (SQLException e) {
            System.err.println(e);
        }
        return null;
    }

    public boolean updateSet(String setID, String setname, int size, String theme) {
        String query = "UPDATE `Set` SET  setname= ?, size = ?, theme = ? WHERE setID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, setname);
            preparedStatement.setInt(2, size);
            preparedStatement.setString(3, theme);
            preparedStatement.setString(4, setID);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateCards(List<Map<String, String>> cardInfo, String setID) {
        String queryDeleteCards = "DELETE FROM card WHERE setID = ?";
        String queryAddCards = "INSERT INTO card (cardID, question, answer, setID, isDifficult) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement deleteStatement = connection.prepareStatement(queryDeleteCards);
                PreparedStatement addStatement = connection.prepareStatement(queryAddCards)) {

            deleteStatement.setString(1, setID);
            int deleteRows = deleteStatement.executeUpdate();

            for (Map<String, String> card : cardInfo) {
                String cardID = UUID.randomUUID().toString();
                String question = card.get("question");
                String answer = card.get("answer");
                boolean isDifficult = false;

                addStatement.setString(1, cardID);
                addStatement.setString(2, question);
                addStatement.setString(3, answer);
                addStatement.setString(4, setID);
                addStatement.setBoolean(5, isDifficult);
                int rowsAffected = addStatement.executeUpdate();
            }
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean favoriteSet(String setIDObject) {
        String userID = LoggedInUserID;
        JSONObject jsonObject = new JSONObject(setIDObject);
        String setID = jsonObject.getString("setID");
        String addQuery = "INSERT INTO Favourite (userID, setID) VALUES (?, ?)";
        String likeQuery = "UPDATE `Set` SET likes = likes +1 WHERE setID = ?";
        String removeQuery = "DELETE FROM Favourite WHERE userID = ? AND setID = ?";
        String unlikeQuery = "UPDATE `Set` SET likes = likes -1 WHERE setID = ?";

        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement addStatement = connection.prepareStatement(addQuery);
                PreparedStatement likeStatement = connection.prepareStatement(likeQuery)) {
            addStatement.setString(1, userID);
            addStatement.setString(2, setID);
            likeStatement.setString(1, setID);
            int addResult = addStatement.executeUpdate();
            int likeResult = likeStatement.executeUpdate();
            return addResult > 0 && likeResult > 0;

        } catch (SQLException e) {
            if (e instanceof SQLIntegrityConstraintViolationException) {
                try (Connection connection2 = DriverManager.getConnection(JDBC_URL)) {
                    PreparedStatement removeStatement = connection2.prepareStatement(removeQuery);
                    PreparedStatement unlikeStatement = connection2.prepareStatement(unlikeQuery);
                    removeStatement.setString(1, userID);
                    removeStatement.setString(2, setID);
                    unlikeStatement.setString(1, setID);
                    int removeResult = removeStatement.executeUpdate();
                    int unlikeResult = unlikeStatement.executeUpdate();
                    return removeResult > 0 && unlikeResult > 0;
                } catch (SQLException f) {
                    f.printStackTrace();
                }
            }
            e.printStackTrace();
        }
        return false;
    }

    public boolean isFavourited(String setIDObject) {
        String userID = LoggedInUserID;
        JSONObject jsonObject = new JSONObject(setIDObject);
        String setID = jsonObject.getString("setID");
        String query = "SELECT COUNT(*) FROM Favourite WHERE userID = ? AND setID = ?";

        try (Connection connection = DriverManager.getConnection(JDBC_URL);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, userID);
            preparedStatement.setString(2, setID);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    int count = resultSet.getInt(1);
                    return count > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateAdmin(Map<String, String> userInfo) throws SQLException {
        String userID = userInfo.get("userID");
        String username = userInfo.get("username");
        String password = userInfo.get("password");
        String email = userInfo.get("email");
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(JDBC_URL);
            connection.setAutoCommit(false);

            deleteFavourite(connection, userID);
            ArrayList<String> setIDs = getMySetIDs(connection, userID);
            if (setIDs != null) {
                for (String setid : setIDs) {
                    deleteCard(connection, setid);
                }
            } else {
                System.out.println("No set found associated with user: " + userID);
            }
            deleteSet(connection, userID); // må gjøres til slutt!

            String addQuery = "insert into admin values (?, ?, ?, ?)";
            String deleteQuery = "delete from user where userID = ?";

            PreparedStatement addStatement = connection.prepareStatement(addQuery);
            PreparedStatement deleteStatement = connection.prepareStatement(deleteQuery);
            addStatement.setString(1, userID);
            addStatement.setString(2, username);
            addStatement.setString(3, password);
            addStatement.setString(4, email);

            int addResult = addStatement.executeUpdate();
            if (addResult > 0) {
                deleteStatement.setString(1, userID);
                int deleteResult = deleteStatement.executeUpdate();
                if (deleteResult > 0) {
                    connection.commit();
                    return true;
                } else {
                    connection.rollback();
                    System.out.println("Failed to delete existing user for admin update");
                }
            } else {
                connection.rollback();
                System.out.println("Failed to add new admin record");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.setAutoCommit(true);
            connection.close();
        }
        return false;
    }

    public ArrayList<String> getMySetIDs(Connection connection, String userID) {
        String setIDQuery = "SELECT setID FROM `Set` WHERE userID = ?";
        try (PreparedStatement setIDStatement = connection.prepareStatement(setIDQuery)) {
            setIDStatement.setString(1, userID);
            ResultSet resultSet = setIDStatement.executeQuery();
            ArrayList<String> setIDs = new ArrayList<>();
            while (resultSet.next()) {
                String setID = resultSet.getString("setID");
                setIDs.add(setID);
            }
            return setIDs;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void deleteSet(Connection connection, String userID) {
        String query = "DELETE FROM `Set` WHERE userID = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, userID);
            int rowsDeleted = preparedStatement.executeUpdate();
            // rowsDeleted checks how many rows we have deleted, can use this to confirm
            // that it the operations is a success

            if (rowsDeleted == 0) {
                System.out.println("No sets found for deletion with userID: " + userID);
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    public void deleteCard(Connection connection, String setID) {
        String query = "DELETE FROM Card WHERE setID = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, setID);
            int rowsDeleted = preparedStatement.executeUpdate();
            // rowsDeleted checks how many rows we have deleted, can use this to confirm
            // that it the operations is a success
            if (rowsDeleted == 0) {
                System.out.println("No cards found for deletion with setID: " + setID);
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    public void deleteFavourite(Connection connection, String userID) {
        String query = "DELETE FROM Favourite WHERE userID = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, userID);
            int rowsDeleted = preparedStatement.executeUpdate();

            if (rowsDeleted == 0) {
                System.out.println("No favourite found for deletion with userID:" + userID);
            }

        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    public static void main(String[] args) {
    }
}