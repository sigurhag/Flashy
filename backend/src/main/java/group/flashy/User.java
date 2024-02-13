package group.flashy;

public class User {

    private static int counter = 0;
    private int userID = 0;
    private String username;
    private String email;
    private String password;
    private boolean isAdmin;
    /**
     * Contstructor for the class.
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
    }

    /**
     * Method to validate username.
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
     * @return userID.
     */
    public int getUserID() {
        return userID;
    }

    /**
     * Gets the username.
     * @return username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Get the email of the user.
     * @return email.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Get the password of the user.
     * @return the password of the user.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Method for checking if user is admin.
     * @return if the user is admin.
     */
    public boolean isAdmin() {
        return isAdmin;
    }

    /**
     * Method for checking if a user is admin.
     */
    public void setIsAdmin() {
        this.isAdmin = true;
    }

    /**
     * Method for updating username.
     * @param username new username.
     */
    public void setUsername(String username) {
        if (isValidUsername(username)) {
            this.username = username;
        }
    }
    /**
     * Main method for this class.
     * @param args
     */
    public static void main(String[] args) {
    }
}
