package org.communique.openai.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record OpenAiApiRequest(@Id Long pkId, LocalDateTime requestDateTime, ApiRequestBody apiRequestBody) {
    public OpenAiApiRequest(ApiRequestBody apiRequestBody) {
        this(null, LocalDateTime.now(), apiRequestBody);
    }
}
