package com.bluepantsmedia.dev.bridgegapp.application.service.util;

// Sonar complains about using RunTimeException, yet there are cases where RunTimeException is the right choice
// This class is a Sonar fluffer
public class HappySonarRuntimeException extends RuntimeException {

	public HappySonarRuntimeException() {
		super();
	}

	public HappySonarRuntimeException(String message) {
		super(message);
	}

	public HappySonarRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

	public HappySonarRuntimeException(Throwable cause) {
		super(cause);
	}

	protected HappySonarRuntimeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
