package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.WebserviceResponse;
import lombok.NonNull;

public interface ErrorLogService {

	/**
	 * an error has occurred in the app, log it and send an email if in prod
	 * Note: it is only catch the server's side errors
	 * @param error the error
	 * @param errorSource either "Server" or "Client"
	 * @return error email's message
	 */
	String handleError(String error, String errorSource);

	/**
	 * an error has occurred in the client app, log it and send an email if in prod
	 * Note: it is only catch the client's side errors
	 * @param error  - the error
	 * @param isTest - If Yes, process an error even environment is not PROD, if false process an error only if an environment is PROD
	 * @return error email's message
	 */
	WebserviceResponse<String> handleClientError(String error, Boolean isTest);

	@NonNull
	WebserviceResponse<String> handleClientError(@NonNull final Object error);

	/**
	 * an exception has occured in the app, send an email if in prod and do not display exception message
	 * @param exception - the exception (500 Error)
	 * @return error email's message
	 */
	String handleException(Exception exception);
}

