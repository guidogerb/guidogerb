package org.communique.openai.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record OpenAiApiRequest(@Id Long pkId, LocalDateTime requestDateTime, String prompt,
                               String model,
                               Integer max_tokens) {
    public OpenAiApiRequest(ApiRequestBody apiRequestBody) {
        this(null, LocalDateTime.now(), apiRequestBody.prompt(), apiRequestBody.model(), apiRequestBody.max_tokens());
    }
}
