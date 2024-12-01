package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.config;

import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;

@Component
@SuppressWarnings("unchecked")
public class CustomErrorAttributes extends DefaultErrorAttributes {

	@Override
	public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
		Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, includeStackTrace);

		checkInvalidCsrf(webRequest, errorAttributes);

		addFormattedTimestamp(errorAttributes);

		return errorAttributes;
	}

	private static void addFormattedTimestamp(Map<String, Object> errorAttributes) {
		Date date = (Date) errorAttributes.get("timestamp");
		if(date != null) {
			ZoneId SLC = ZoneId.of("America/Denver");
			ZonedDateTime d = ZonedDateTime.ofInstant(date.toInstant(), SLC);
			String timestamp = d.format(DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss a"));
			errorAttributes.put("timestamp", timestamp);
		}
	}

	private static void checkInvalidCsrf(RequestAttributes requestAttributes, Map<String, Object> errorAttributes) {
		Object exception = getRequestAttribute(requestAttributes,"SPRING_SECURITY_403_EXCEPTION");

		if (exception instanceof InvalidCsrfTokenException) {
			InvalidCsrfTokenException csrfTokenException = (InvalidCsrfTokenException)exception;
			errorAttributes.put("status", 403);
			errorAttributes.put("error", "Access Denied");
			errorAttributes.put("exception", InvalidCsrfTokenException.class.getName());
			errorAttributes.put("message", csrfTokenException.getMessage());
		}
	}

	private static <T> T getRequestAttribute(RequestAttributes requestAttributes, String name) {
		return (T) requestAttributes.getAttribute(name, RequestAttributes.SCOPE_REQUEST);
	}

}