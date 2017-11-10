package me.loki2302.backend;

import com.fasterxml.jackson.databind.SerializationFeature;
import org.elasticsearch.client.Client;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.time.Clock;

@Configuration
@EnableElasticsearchRepositories
public class BackendConfig {
    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }

    @Bean
    public ApiController apiController() {
        return new ApiController();
    }

    @Bean
    public LogRecordController logRecordController(Clock clock, LogRecordRepository logRecordRepository) {
        return new LogRecordController(clock, logRecordRepository);
    }

    @Bean
    public ElasticsearchTemplate elasticsearchTemplate(Client client) {
        return new ElasticsearchTemplate(client, new EntityMapperWithJava8TimeSupport());
    }

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizer() {
        return jacksonObjectMapperBuilder ->
                jacksonObjectMapperBuilder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }
}
