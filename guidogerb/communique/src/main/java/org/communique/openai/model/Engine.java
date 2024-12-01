package org.communique.openai.model;

import java.util.Date;

public record Engine(String object, String id, Boolean ready, String owner, String permissions, Date created) {
}
