package me.loki2302.backend;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface LogRecordRepository extends ElasticsearchRepository<LogRecord, String> {
}
