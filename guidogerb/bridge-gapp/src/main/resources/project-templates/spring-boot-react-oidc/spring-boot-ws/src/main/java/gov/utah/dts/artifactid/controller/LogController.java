package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.controller;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.ErrorLogService;
import lombok.Getter;
import lombok.NonNull;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;


@ControllerAdvice
@CrossOrigin
public class LogController {

	@Getter
	private static final Logger logger = LogManager.getContext().getLogger(LogController.class.getName());

	private final ErrorLogService errorLogService;
	LogController(@NonNull final ErrorLogService errorLogService) {
		this.errorLogService = errorLogService;
	}

	@ResponseStatus(value=HttpStatus.CONFLICT)  // 409
	@ExceptionHandler(Exception.class)
	public void  handlerServerExeption(HttpServletRequest req, Exception ex) {
		logger.error("Request: " + req.getRequestURL() + " raised " + ex);
		errorLogService.handleException(ex);
	}
}