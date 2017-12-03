package me.loki2302.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PageDto<TItem> {
    private List<TItem> items;
    private int page;
    private int size;
    private long totalPages;
    private long totalItems;
}
