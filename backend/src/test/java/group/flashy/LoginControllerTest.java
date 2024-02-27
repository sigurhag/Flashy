package group.flashy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import group.flashy.Controller.MainController;
import group.flashy.Service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
//@ContextConfiguration(classes = {MainController.class, UserService.class})
@AutoConfigureMockMvc
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void checkValidUser() throws Exception {
        String json = "{\"username\":\"Tomhello\",\"password\":\"secrety\"}";

        mockMvc.perform(post("/flash/verify")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string("Successful login"));
    }

    @Test
    public void checkInvalidUser() throws Exception {
        String json = "{\"username\":\"nono\",\"password\":\"skybert\"}";

        mockMvc.perform(post("/flash/verify")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid Username or password"));
    }
}
