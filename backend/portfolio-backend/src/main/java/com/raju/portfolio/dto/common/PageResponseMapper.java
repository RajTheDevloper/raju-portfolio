package com.raju.portfolio.dto.common;

import org.springframework.data.domain.Page;

import java.util.function.Function;

public final class PageResponseMapper {

    private PageResponseMapper() {
    }

    public static <T, R> PageResponse<R> map(
            Page<T> page,
            Function<T, R> mapper) {

        PageResponse<R> response = new PageResponse<>();

        response.setContent(
                page.getContent()
                        .stream()
                        .map(mapper)
                        .toList()
        );

        response.setPage(page.getNumber());
        response.setSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setFirst(page.isFirst());
        response.setLast(page.isLast());

        return response;
    }
}