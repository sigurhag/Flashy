package group.flashy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Admin extends User {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase";

    public Admin(String username, String password, String email, boolean isAdmin) {
        super(username, password, email, true);
    }

    public void deleteSet(int setID) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "DELETE FROM sets WHERE setID = ?";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, setID);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    public void makeUserAdmin(int userID) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "UPDATE users SET isAdmin = true WHERE userID = ?";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, userID);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }    

    public void createAdminUser(String username, String password, String email) {
        User user = new User(username, password, email, true);
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "INSERT INTO users (username, password, email, isAdmin) VALUES (?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, user.getUsername());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.setString(3, user.getEmail());
                preparedStatement.setBoolean(4, user.isAdmin());
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }
}

