package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.google.gson.Gson;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.ErrorLogMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.SystemPropertyMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.Email;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.ErrorLog;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.WebserviceResponse;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util.EmailService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util.WebserviceResponseService;
import lombok.NonNull;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ErrorLogServiceImpl implements ErrorLogService {

	private final WebserviceResponseService webserviceResponseService;
	private final EmailService emailService;
	private final ErrorLogMapper errorLogMapper;
	private final SystemPropertyMapper systemPropertyMapper;
	private final Gson gson;

	public ErrorLogServiceImpl(
			@NonNull final WebserviceResponseService webserviceResponseService,
			@NonNull final EmailService emailService,
			@NonNull final ErrorLogMapper errorLogMapper,
			@NonNull final SystemPropertyMapper systemPropertyMapper,
			@NonNull final Gson gson
	) {
		this.webserviceResponseService = webserviceResponseService;
		this.emailService = emailService;
		this.errorLogMapper = errorLogMapper;
		this.systemPropertyMapper = systemPropertyMapper;
		this.gson = gson;
	}

	@Override
	public String handleError(String error, String errorSource) {

		// email the error
		ErrorLog errorLog = new ErrorLog();
		errorLog.setMessage(error);
		errorLog.setCreateDate(LocalDateTime.now());
		if ("".equals(StringUtils.defaultString(errorLog.getMessage(),""))) {
			errorLog.setMessage("No error message");
		}
		// convert local date to string
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
		String strToday = errorLog.getCreateDate().format(formatter);
		final Email email = new Email();
		email.setSubject("Batch Change - " + errorSource + " Error Log");
		email.setMessage("Batch Change - " + errorSource + " Error. Error occurs " + strToday + "<br>" + errorLog.getMessage());
		emailService.sendEmail(null,null,email,true);

		// store the error in the db
		errorLogMapper.insertErrorLog(errorLog);

		return email.getMessage();
	}

	@Override
	public String handleException (Exception exception) {
		// If environment is production, process error
        if (StringUtils.defaultString(systemPropertyMapper.selectSystemProperty(SystemPropertyMapper.ENVIRONMENT)).equals(SystemPropertyMapper.ENVIRONMENT_PRODUCTION)){
			return handleError(StringUtils.defaultString(exception.getMessage(),""),"Server");
		} else {
        	return "";
		}
	}

	@Override
	public WebserviceResponse<String> handleClientError(@Nullable final String error, @Nullable final Boolean isTest) {
		String result = "";
		if (BooleanUtils.isTrue(isTest) ||
				StringUtils.defaultString(systemPropertyMapper.selectSystemProperty(SystemPropertyMapper.ENVIRONMENT)).equals(SystemPropertyMapper.ENVIRONMENT_PRODUCTION)) {
			result = handleError(error, "Client");
		}
		return webserviceResponseService.response(result, null);
	}

	@Override
	@NonNull
	public WebserviceResponse<String> handleClientError(@NonNull final Object error) {
		return handleClientError(gson.toJson(error), true);
	}
}
