package me.loki2302.app;

import me.loki2302.backend.BackendConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(BackendConfig.class)
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
