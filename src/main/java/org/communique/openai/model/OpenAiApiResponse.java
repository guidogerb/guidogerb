package org.communique.openai.model;

import org.springframework.data.annotation.Id;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public record OpenAiApiResponse(@Id Long id, LocalDateTime requestDateTime, String responseId, String object, Timestamp created, String model, List<Choice> choices, Usage usage) {
    public OpenAiApiResponse(ApiResponse apiResponse) {
        this(null,LocalDateTime.now(), apiResponse.id(), apiResponse.object(), apiResponse.created(), apiResponse.model(), apiResponse.choices(), apiResponse.usage());
    }

}
