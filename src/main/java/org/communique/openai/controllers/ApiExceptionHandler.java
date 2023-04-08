package org.communique.openai.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(ModelNotFoundException.class)
  public ProblemDetail handlerMNFE(ModelNotFoundException e) {
    ProblemDetail problemDetail = 
        ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, e.getMessage());
    problemDetail.setProperty("extra info", "I don't know that model.");
    return problemDetail;
  }
  
}
