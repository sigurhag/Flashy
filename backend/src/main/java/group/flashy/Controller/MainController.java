package group.flashy.Controller;

import java.io.Console;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.json.JSONObject;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import group.flashy.Set;
import group.flashy.User;
import group.flashy.Admin;
import group.flashy.Card;
import group.flashy.Service.CardService;
import group.flashy.Service.UserService;
import netscape.javascript.JSObject;

@RestController
@CrossOrigin
@RequestMapping("/flash")
public class MainController {
    private final UserService userService;
    private final CardService cardService;
    private ObjectMapper objectMapper;

    public MainController(UserService userService, CardService cardService, ObjectMapper objectMapper) {
        this.userService = userService;
        this.cardService = cardService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/test")
    public String testA() {
        return "IT is working, JSON?";
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyLogin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        boolean isValid = userService.verifyLogIn(username, password);
        if (isValid) {
            return ResponseEntity.ok("Successful login");
        } else {
            return ResponseEntity.badRequest().body("Invalid Username or password");
        }
    }

    @GetMapping("/loggedInUserID")
    public ResponseEntity<String> getLoggedInUserID() {
        String loggedInUserID = UserService.LoggedInUserID;
        return ResponseEntity.ok(loggedInUserID);
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
        return ResponseEntity.ok(mySets);
    }

    @GetMapping("/favorites")
    public ResponseEntity<ArrayList<Set>> getMyFavorites() {
        ArrayList<Set> myFavorites = userService.getFavorites();
        return ResponseEntity.ok(myFavorites);
    }

    @GetMapping("/mostpopular") // Used for both all sets and getSetsFromTheme in Home.js
    public ResponseEntity<ArrayList<Set>> getMostPopular() {
        ArrayList<Set> mostPopular = userService.getMostPopular();
        return ResponseEntity.ok(mostPopular);
    }

    @GetMapping("/search/{searchword}")
    public ResponseEntity<ArrayList<Set>> searchFor(@PathVariable("searchword") String searchWord) {
        ArrayList<Set> result = cardService.searchEngine(searchWord);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/profile")
    public ResponseEntity<ArrayList<String>> getProfileInfo() {
        ArrayList<String> userInfo = userService.getUserInfo(UserService.LoggedInUserID);
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/changeEmail")
    public ResponseEntity<String> changeEmail(@RequestBody Map<String, String> changes) {
        String newEmail = changes.get("newEmail");

        boolean success = userService.changeEmail(newEmail);

        if (success) {
            return ResponseEntity.ok("Email changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to change email");
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> changes) {
        String newPassword = changes.get("newPassword");

        boolean success = userService.changePassword(newPassword);

        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to change password");
        }
    }

    @PostMapping("/changeUsername")
    public ResponseEntity<String> changeUsername(@RequestBody Map<String, String> changes) {
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

    @PostMapping("/updateAdmin")
    public ResponseEntity<Boolean> updateAdmin(@RequestBody Map<String, String> userInfo) throws SQLException {
        System.out.println(userInfo);
        boolean isValid = userService.updateAdmin(userInfo);
        return ResponseEntity.ok(isValid);
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

    @PostMapping("/removeSet")
    public ResponseEntity<Boolean> removeSet(@RequestBody String setID) {
        boolean success = false;
        success = userService.removeSet(setID);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/favouriteSet")
    public ResponseEntity<Boolean> favouriteSet(@RequestBody String setID) {
        boolean success = false;
        success = userService.favoriteSet(setID);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/isFavourited")
    public ResponseEntity<Boolean> isFavourited(@RequestBody String setID) {
        boolean isFavourited = userService.isFavourited(setID);
        return ResponseEntity.ok(isFavourited);
    }

    @PostMapping("/fetchSet")
    public ResponseEntity<Set> fetchSet(@RequestBody String setID) {
        Set setInfo = userService.getSet(setID);
        return ResponseEntity.ok(setInfo);
    }

    @PostMapping("/fetchCards")
    public ResponseEntity<ArrayList<Card>> fetchCard(@RequestBody Map<String, String> requestBody) {
        String setID = requestBody.get("setID");
        ArrayList<Card> cards = userService.getCards(setID);
        return ResponseEntity.ok(cards);
    }

    @PostMapping("/updateSet")
    public ResponseEntity<Boolean> updateSet(@RequestBody Map<String, String> setInfo) {
        String setID = setInfo.get("setID");
        String title = setInfo.get("title");
        int size = Integer.parseInt(setInfo.get("size"));
        String theme = setInfo.get("category");
        boolean isValid = userService.updateSet(setID, title, size, theme);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/updateCard")
    public ResponseEntity<Boolean> updateCards(@RequestBody List<Map<String, String>> cardInfo, String setID) {
        Boolean success = userService.updateCards(cardInfo, setID);
        return ResponseEntity.ok(success);
    }


    @GetMapping("/getset/{setid}")
    public ResponseEntity<String> getCorrespondingSet(@PathVariable ("setid") String setID) {
        ArrayList<Card> setCards = cardService.accessCard(setID);
        System.out.println(setCards);
        try {
            String json = objectMapper.writeValueAsString(setCards);
            return ResponseEntity.ok(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}