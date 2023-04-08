package org.communique.openai.controllers;

public class ModelNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ModelNotFoundException(String model) {
        super("Model " + model + " not found.");
    }
}
