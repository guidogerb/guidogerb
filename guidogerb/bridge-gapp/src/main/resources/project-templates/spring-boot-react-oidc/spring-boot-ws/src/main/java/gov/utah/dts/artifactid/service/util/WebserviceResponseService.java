package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.WebserviceResponse;
import org.springframework.lang.Nullable;

import java.util.List;

public interface WebserviceResponseService {
	/**
	 * Used by SecurityUserDetailService so no security
	 * @param data data back to caller
	 * @return UserInfo object
	 */
	<T> WebserviceResponse<T> response(@Nullable final T data, @Nullable final List<String> errors);
}
