/**
 * Package containing the main application class.
 * Do not change anything here due to checkstyle violations
 */
package group.flashy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public final class FlashyApplication {
/**
     * Private constructor to prevent instantiation.
     */
    private FlashyApplication() {
        // private constructor to prevent instantiation
    }

/**
     * Method for launching the application.
     *
     * @param args command line arguments
     */
public static void main(final String[] args) {
SpringApplication.run(FlashyApplication.class, args);
}
}
