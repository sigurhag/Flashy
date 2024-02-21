package group.flashy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class Set { 

    // Field for database connection
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flashyDatabase";
    
    private static int nextSetID = 1; //static value for nextSetID
    private String setID;
    private String setname;
    private int size;
    private String theme;
    private String userID;

    public Set(String setname, String theme, String userID) {
        this.setID = UUID.randomUUID().toString();
        this.setname = setname;
        this.size = 0;
        this.theme = theme;
        this.userID = userID;
        saveSetToDatabase();
    }


    //Getters

    public String getSetID() {
        return (String) getSetInfo("setID");
    }

    public String getSetName() {
        return (String) getSetInfo("setname");
    }

    public int getSize() {
        return (int) getSetInfo("size");
    }

    public String getTheme() {
        return (String) getSetInfo("theme");
    }

    public int getUserID() {
        return (int) getSetInfo("userID");
    }
    
    //Methods

    public void setSetTheme(String theme) {
        updateSetInfo("theme", theme);
    }

    public void setSetName(String name) {
        updateSetInfo("setname", name);
    }
    //SQL

    public Object getSetInfo(String field) {
        Object value = null;
        String query = "SELECT " + field + " FROM set WHERE setID = ?";
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, setID);
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

    public void saveSetToDatabase() {
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "INSERT INTO card (setID, setname, size, theme, userID) VALUES(?,?,?,?,?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, setID);
                preparedStatement.setString(2, setname);
                preparedStatement.setInt(3, size);
                preparedStatement.setString(4, theme);
                preparedStatement.setString(5, userID);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    public void addCardToSet(Card card) {
            // Validate that the provided setID exists in the Set table
    boolean setExists = validateSetExists(card.getCardSetID());
    
    if (!setExists) {
        System.err.println("Error: The specified setID does not exist.");
        return; // Exit the method if the setID is invalid
    }
    
    try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
        String cardInsertQuery = "INSERT INTO card (setID) VALUES (?)";
            try (PreparedStatement cardStatement = connection.prepareStatement(cardInsertQuery)) {
                cardStatement.setInt(1, card.getCardSetID()); // Sets setID for the card to the provided setID
                cardStatement.executeUpdate();
            }
        } 
        catch (SQLException e) {
            System.err.println("Error adding card to database: " + e.getMessage());
        }
    }

    private boolean validateSetExists(int setID) {
        boolean setExists = false;
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "SELECT COUNT(*) FROM Set WHERE setID = ?";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, setID);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    if (resultSet.next()) {
                        int count = resultSet.getInt(1);
                        setExists = count > 0;
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Error validating set existence: " + e.getMessage());
        }
        return setExists;
    }
    

    public void updateSetInfo(String field, Object newValue) {
        switch (field) {
            case "setname":
                this.setname = (String) newValue;
                break;
            case "theme":
                this.theme = (String) newValue;
                break;
            default:
                throw new IllegalArgumentException(field + " is not a field which support updating!");
        }
        try (Connection connection = DriverManager.getConnection(JDBC_URL)) {
            String query = "UPDATE set SET " + field + " = ? WHERE setID = ?";
            try (PreparedStatement updateStatement = connection.prepareStatement(query)) {
                updateStatement.setObject(1, newValue);
                updateStatement.setString(2, setID);
                updateStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println(e);
        }
    }
}


