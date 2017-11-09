package me.loki2302.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BackendConfig {
    @Bean
    public ApiController apiController() {
        return new ApiController();
    }
}
