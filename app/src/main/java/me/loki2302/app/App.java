package me.loki2302.app;

import me.loki2302.backend.BackendConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@SpringBootApplication
@Import(BackendConfig.class)
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    public WebMvcConfigurer webMvcConfigurer(ResourceProperties resourceProperties) {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry resourceHandlerRegistry) {
                resourceHandlerRegistry
                        .addResourceHandler("/**")
                        .addResourceLocations(resourceProperties.getStaticLocations())
                        .resourceChain(true)
                        .addResolver(new SinglePageApplicationResourceResolver());
            }
        };
    }

    public static class SinglePageApplicationResourceResolver extends PathResourceResolver {
        private final static Logger LOGGER = LoggerFactory.getLogger(SinglePageApplicationResourceResolver.class);

        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
            LOGGER.debug("getResource(): resourcePath={}, location={}", resourcePath, location);

            Resource resource = location.createRelative(resourcePath);
            if(resource.exists() && resource.isReadable()) {
                return resource;
            }

            resource = location.createRelative("index.html");
            if(resource.exists() && resource.isReadable()) {
                return resource;
            }

            return null;
        }
    }
}
