package group.flashy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class User {

    // Field for database connection
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashy?username=gurokristensen&password=Flashy123";

    private static final boolean True = false;

    // Fields for Users
    private static int counter = 5;
    private int userID = 5;
    private String username;
    private String email;
    private String password;
    private boolean isAdmin;

    /**
     * Contstructor for the class.
     *
     * @param username
     * @param password
     * @param email
     * @param isAdmin
     */
    public User(String username, String password, String email,
            boolean isAdmin) {
        if (isValidUsername(username)) {
            this.username = username;
        }
        if (isValidPassword(password)) {
            this.password = password;
        }
        if (isValidEmail(email)) {
            this.email = email;
        }
        this.isAdmin = isAdmin;
        this.userID = ++counter;

        saveUserToDatabase();
    }

    /**
     * Method to validate username.
     *
     * @param username the username to check
     * @return true if the username is valid
     */
    private boolean isValidUsername(String username) {
        if (username.length() < 5 || username.length() > 20) {
            return false;
        }
        return true;
    }

    /**
     * Method to validate password.
     *
     * @param password password to check
     * @return true if it meets the conditions
     */
    private boolean isValidPassword(String password) {
        if (password.length() < 7 || password.length() > 20) {
            return false;
        }
        return true;
    }

    /**
     * Private method to check email.
     *
     * @param email the email to check if is valid
     * @return true if it meets the conditions
     */
    private boolean isValidEmail(String email) {
        if (!email.endsWith("@gmail.com")
                && !email.endsWith("@stud.ntnu.no")
                && !email.endsWith("@hotmail.com")) {
            return false;
        }
        return true;
    }

    /**
     * get the userID.
     *
     * @return userID.
     */
    public int getUserID() {
        return (int) getUserData("userID");
    }

    /**
     * Gets the username.
     *
     * @return username.
     */
    public String getUsername() {
        return (String) getUserData("username");
    }

    /**
     * Get the email of the user.
     *
     * @return email.
     */
    public String getEmail() {
        return (String) getUserData("email");
    }

    /**
     * Get the password of the user.
     *
     * @return the password of the user.
     */
    public String getPassword() {
        return (String) getUserData("password");
    }

    /**
     * Method for checking if user is admin.
     *
     * @return if the user is admin.
     */
    public boolean isAdmin() {
        return (boolean) getUserData("isAdmin");
    }

    /**
     * Method for checking if a user is admin.
     */
    public void setIsAdmin() {
        updateUserInfo("isAdmin", true);
    }

    /**
     * Method for updating username.
     *
     * @param newUsername new username.
     */
    public void setUsername(String newUsername) {
        updateUserInfo("username", newUsername);
    }

    /**
     * Method for saving new user to database.
     */
    public void saveUserToDatabase() {
        
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            System.out.println("heihei");
            String query = "INSERT INTO User (userID, username, password, email) VALUES(?,?,?,?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, userID);
                preparedStatement.setString(2, username);
                preparedStatement.setString(3, password);
                preparedStatement.setString(4, email);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            
            System.err.println(e);
            
        }
    }

    /**
     * Method for querying desired data from DB.
     * @param field what to retrive
     * @return data
     */
    public Object getUserData(String field) {
        Object value = null;
        String query = "SELECT " + field + " FROM user WHERE userID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, userID);
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
     * Method for updating user info in DB.
     * @param field which field to update
     * @param newValue the new value for the field
     */
    public void updateUserInfo(String field, Object newValue) {
        switch (field) {
            case "username":
                if (isValidUsername((String) newValue)) {
                    this.username =  (String) newValue;
                }
                break;
            case "isAdmin":
                this.isAdmin = (boolean) newValue;
                break;
            default:
                throw new IllegalArgumentException(field + " is not a field which support updating!");
        }
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "UPDATE user SET " + field + " = ? WHERE userID = ?";
            try (PreparedStatement updateStatement = connection.prepareStatement(query)) {
                updateStatement.setObject(1, newValue);
                updateStatement.setInt(2, userID);
                updateStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    /**
     * Main method for this class.
     *
     * @param args
     */
    public static void main(String[] args) {
        User Knut = new User("Knut123", "okidoki123", "knuterkul.123", True);
    }
}
