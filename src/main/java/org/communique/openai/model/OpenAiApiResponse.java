package org.communique.openai.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record OpenAiApiResponse(@Id Long pkId, LocalDateTime requestDateTime, ApiResponse response) {
}
