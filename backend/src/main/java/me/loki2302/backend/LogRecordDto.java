package me.loki2302.backend;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class LogRecordDto extends EditableLogRecordAttributes {
    private String id;
    private Instant createdAt;
    private Instant updatedAt;
}
