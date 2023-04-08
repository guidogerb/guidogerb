package org.communique.openai.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record OpenAiApiEnginesResponse(@Id Long id, LocalDateTime responseDateTime, Engines engines) {
}
