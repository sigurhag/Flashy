package group.flashy.Controller;

import java.util.ArrayList;
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
        return ResponseEntity.ok(mySets);
    }

    @GetMapping("/favorites")
    public ResponseEntity<ArrayList<Set>> getMyFavorites() {
        ArrayList<Set> myFavorites = userService.getFavorites();
        return ResponseEntity.ok(myFavorites);
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

}
