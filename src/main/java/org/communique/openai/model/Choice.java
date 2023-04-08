package org.communique.openai.model;

public record Choice(String text, int index, float logprobs, String finish_reason ) {
}