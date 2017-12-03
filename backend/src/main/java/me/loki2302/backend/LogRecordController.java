package me.loki2302.backend;

import me.loki2302.backend.dto.EditableLogRecordAttributes;
import me.loki2302.backend.dto.LogRecordDto;
import me.loki2302.backend.dto.PageDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.Clock;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder.fromMethodCall;
import static org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder.on;

@RequestMapping("/api/logrecords")
public class LogRecordController {
    private final static Logger LOGGER = LoggerFactory.getLogger(LogRecordController.class);

    private final Clock clock;
    private final LogRecordRepository logRecordRepository;

    public LogRecordController(Clock clock, LogRecordRepository logRecordRepository) {
        this.clock = clock;
        this.logRecordRepository = logRecordRepository;
    }

    @GetMapping
    public ResponseEntity<?> getLogRecords(
            @RequestParam(name = "page", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "size", defaultValue = "5") Integer pageSize) {

        PageRequest pageRequest = new PageRequest(pageNumber, pageSize, Sort.Direction.DESC, "createdAt");
        Page<LogRecord> logRecordsPage = logRecordRepository.findAll(pageRequest);

        List<LogRecordDto> logRecordDtos = logRecordsPage.getContent().stream()
                .map(LogRecordController::logRecordToLogRecordDto)
                .collect(Collectors.toList());

        PageDto<LogRecordDto> pageDto = PageDto.<LogRecordDto>builder()
                .page(pageNumber)
                .size(pageSize)
                .totalPages(logRecordsPage.getTotalPages())
                .totalItems(logRecordsPage.getTotalElements())
                .items(logRecordDtos)
                .build();

        return ResponseEntity.ok(pageDto);
    }

    @PostMapping
    public ResponseEntity<?> postLogRecord(@RequestBody EditableLogRecordAttributes attributes) {
        LOGGER.info("Got logRecordDto: {}", attributes);

        LogRecord logRecord = new LogRecord();
        logRecord.setId(UUID.randomUUID().toString());
        logRecord.setCreatedAt(clock.instant());
        logRecord.setUpdatedAt(null);
        setEditableLogRecordAttributes(logRecord, attributes);
        logRecordRepository.save(logRecord);

        URI uri = fromMethodCall(on(LogRecordController.class).getLogRecord(logRecord.getId())).build().toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getLogRecord(@PathVariable("id") String id) {
        LogRecord logRecord = logRecordRepository.findOne(id);
        if(logRecord == null) {
            return ResponseEntity.notFound().build();
        }

        LogRecordDto logRecordDto = logRecordToLogRecordDto(logRecord);
        return ResponseEntity.ok(logRecordDto);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> putLogRecord(
            @PathVariable("id") String id,
            @RequestBody EditableLogRecordAttributes attributes) {

        LogRecord logRecord = logRecordRepository.findOne(id);
        if(logRecord == null) {
            return ResponseEntity.notFound().build();
        }

        setEditableLogRecordAttributes(logRecord, attributes);
        logRecord.setUpdatedAt(clock.instant());
        logRecordRepository.save(logRecord);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteLogRecord(@PathVariable("id") String id) {
        LogRecord logRecord = logRecordRepository.findOne(id);
        if(logRecord == null) {
            return ResponseEntity.notFound().build();
        }

        logRecordRepository.delete(id);

        return ResponseEntity.noContent().build();
    }

    private static LogRecordDto logRecordToLogRecordDto(LogRecord logRecord) {
        LogRecordDto logRecordDto = new LogRecordDto();
        logRecordDto.setId(logRecord.getId());
        logRecordDto.setCreatedAt(logRecord.getCreatedAt());
        logRecordDto.setUpdatedAt(logRecord.getUpdatedAt());
        logRecordDto.setText(logRecord.getText());
        return logRecordDto;
    }

    private static void setEditableLogRecordAttributes(LogRecord logRecord, EditableLogRecordAttributes attributes) {
        logRecord.setText(attributes.getText());
    }
}
