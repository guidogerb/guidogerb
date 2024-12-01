package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import lombok.Getter;
import lombok.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;

@Getter
@SuppressWarnings("unused")
public class WebserviceResponse<T> {
	private final List<String> errors;
	private final T data;
	private final List<String> roles;

	public WebserviceResponse(@NonNull final List<String> roles, @Nullable final T data, @Nullable final List<String> errors) {
		this.roles = roles;
		this.data = data;
		this.errors = errors;
	}
}
