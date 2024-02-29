package group.flashy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Admin extends User {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase?user=generalUser&password=Flashy123";

    public Admin(String username, String password, String email) {
        super(username, password, email);
    }

    //Sletter et set fra databasen med gitt setID
    public void deleteSet(int setID) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "DELETE FROM set WHERE setID = ?";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, setID);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    //Sletter User og lager en Admin med samme attributter
    public void makeUserAdmin(User user) {

        if (!userExists(user)) {
            throw new IllegalArgumentException("User does not exist in the database");
        }

        if (adminExists(user)) {
            throw new IllegalArgumentException("User is already admin");
        }

        deleteUserFromDatabase(user);

        createAdminInDatabase(user);
    }  

    //Deletes admin and creates a user with the same attributes
    public void removeAdminRights(User user) {

        if (!adminExists(user)) {
            throw new IllegalArgumentException("Admin does not exist in the database");
        }

        if (!userExists(user)) {
            throw new IllegalArgumentException("User does not have admin rights");
        }

        deleteAdminFromDatabase(user);

        user.saveUserToDatabase();
    }

    //Checks if User exists in database
    private boolean userExists(User user) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM user WHERE userID = ?")) {
            preparedStatement.setString(1, user.getUserID());
            try (ResultSet rs = preparedStatement.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //Checks if Admin exists in database
    private boolean adminExists(User user) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM admin WHERE adminID = ?")) {
            preparedStatement.setString(1, user.getUserID());
            try (ResultSet rs = preparedStatement.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //Deletes User from database
    private void deleteUserFromDatabase(User user) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM user WHERE userID = ?")) {
            preparedStatement.setString(1, user.getUserID());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to delete the admin from the database
    private void deleteAdminFromDatabase(User user) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM admin WHERE adminID = ?")) {
            preparedStatement.setString(1, user.getUserID());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to create an admin in the database
    private void createAdminInDatabase(User user) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL);
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO admin (adminID, username, password, email) VALUES (?, ?, ?, ?)")) {
            preparedStatement.setString(1, user.getUserID());
            preparedStatement.setString(2, user.getUsername());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setString(4, user.getEmail());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        
    }
}

