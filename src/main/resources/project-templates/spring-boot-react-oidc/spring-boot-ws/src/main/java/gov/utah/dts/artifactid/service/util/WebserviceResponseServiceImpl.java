package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.WebserviceResponse;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security.SecurityService;
import lombok.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WebserviceResponseServiceImpl implements WebserviceResponseService {

	private final SecurityService securityService;

	public WebserviceResponseServiceImpl(@NonNull final SecurityService securityService) {
		this.securityService = securityService;
	}

	public <T> WebserviceResponse<T> response(@Nullable final T data, @Nullable final List<String> errors) {
		final SecurityUser securityUser = securityService.getActiveUser();
		return new WebserviceResponse<>(securityUser == null ? new ArrayList<>() : securityUser.getRoles(), data, errors);
	}
}
