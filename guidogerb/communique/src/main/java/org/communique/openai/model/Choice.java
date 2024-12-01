package org.communique.openai.model;

import org.springframework.data.annotation.Id;

public record Choice(@Id Long id, String text, int index, float logprobs, String finish_reason ) {
}