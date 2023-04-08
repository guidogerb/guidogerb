package org.communique.openai.model;

public record ApiRequestBody(String prompt, String model, int max_tokens) {
}
