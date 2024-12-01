package org.communique.openai.model;

import java.sql.Timestamp;
import java.util.List;

public record ApiResponse(String id, String object, Timestamp created, String model, List<Choice> choices, Usage usage) {
}
