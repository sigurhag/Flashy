package group.flashy.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.flashy.Set;
import group.flashy.User;
import group.flashy.Admin;
import group.flashy.Service.CardService;
import group.flashy.Service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/flash")
public class MainController {

    private final UserService userService;
    private final CardService cardService;

    public MainController(UserService userService, CardService cardService) {
        this.userService = userService;
        this.cardService = cardService;
    }
    
    @GetMapping("/test")
    public String testA() {
        return "IT is working, JSON?";
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyLogin(@RequestBody Map<String, String> credentials) {
        String username= credentials.get("username");
        String password = credentials.get("password");
        boolean isValid = userService.verifyLogIn(username, password);
        if (isValid) {
            return ResponseEntity.ok("Successful login");
        } else {
            return ResponseEntity.badRequest().body("Invalid Username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String password2 = credentials.get("password2");
        String email = credentials.get("email");
        boolean isValid = userService.registerUser(username, password, password2, email);
        if (isValid) {
            return ResponseEntity.ok("Successful register and login");
        } else {
            return ResponseEntity.badRequest().body("Invalid Username, password and/or email");
        }
    }

    @GetMapping("/mysets")
    public ResponseEntity<ArrayList<Set>> getMySets() {
        ArrayList<Set> mySets = userService.getMySets();
        System.out.println("Retrieved sets: " + mySets.toString());
        return ResponseEntity.ok(mySets);
    }
    @GetMapping("/favorites")
    public ResponseEntity<ArrayList<Set>> getMyFavorites() {
        ArrayList<Set> myFavorites = userService.getFavorites();
        return ResponseEntity.ok(myFavorites);
    }

    @GetMapping("/mostpopular")
    public ResponseEntity<ArrayList<Set>> getMostPopular() {
        ArrayList<Set> mostPopular = userService.getMostPopular();
        System.out.println("Retrieved sets: " + mostPopular.toString());
        return ResponseEntity.ok(mostPopular);
    }

    @GetMapping("/search/{searchword}")
    public ResponseEntity<ArrayList<Set>> searchFor(@PathVariable ("searchword") String searchWord) {
        ArrayList<Set> result = cardService.searchEngine(searchWord);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/profile")
    public ResponseEntity<ArrayList<String>> getProfileInfo() {
        ArrayList<String> userInfo = userService.getUserInfo(UserService.LoggedInUserID);
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/changeEmail")
    public ResponseEntity<String> changeEmail(@RequestBody Map<String, String> changes){
        String newEmail = changes.get("newEmail");

        boolean success = userService.changeEmail(newEmail);

        if (success) {
            return ResponseEntity.ok("Email changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to change email");
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> changes){
        String newPassword = changes.get("newPassword");

        boolean success = userService.changePassword(newPassword);

        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to change password");
        }
    }
    @PostMapping("/changeUsername")
    public ResponseEntity<String> changeUsername(@RequestBody Map<String, String> changes){
        String newUsername = changes.get("newUsername");

        boolean success = userService.changeUsername(newUsername);

        if (success) {
            return ResponseEntity.ok("Username changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to change username");
        }
    }

    @GetMapping("/adminRights")
    public ResponseEntity<Boolean> getAdminRights() {
        boolean isAdmin = userService.checkISAdmin(UserService.LoggedInUserID);
        return ResponseEntity.ok(isAdmin);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<ArrayList<User>> getAllUsers() {
        ArrayList<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/updateAdmin")
    public ResponseEntity<String> updateAdmin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String email = credentials.get("email");
        boolean isValid = userService.updateAdmin(UserService.LoggedInUserID, username, password, email);
        if (isValid) {
            return ResponseEntity.ok("Successfully updated adminRights");
        } else {
            return ResponseEntity.badRequest().body("Failed to update adminRights");
        }
    }


    @PostMapping("/addSet")
    public ResponseEntity<Boolean> addSet(@RequestBody Map<String, String> setInfo) {
        String title = setInfo.get("title");
        int size = Integer.parseInt(setInfo.get("size"));
        String theme = setInfo.get("category");
        boolean success = userService.saveSetToDatabase(title, size, theme, UserService.LoggedInUserID);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/addCards")
    public ResponseEntity<Boolean> addCards(@RequestBody List<Map<String, String>> cardInfo) {
        boolean success = false;
        for (Map<String, String> card : cardInfo) {
            String question = card.get("question");
            String answer = card.get("answer");
            System.out.println(question + " " + answer);
            success = userService.saveCardToDatabase(question, answer);
        }
        return ResponseEntity.ok(success);
    }
}