package org.communique.openai.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Usage(@Id Long id, LocalDateTime requestDateTime, int prompt_tokens, int completion_tokens, int total_tokens) {
    public Usage(int prompt_tokens, int completion_tokens, int total_tokens) {
        this(null, LocalDateTime.now(), prompt_tokens, completion_tokens, total_tokens);
    }
}
