package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@SuppressWarnings("unused")
public class RoleGroupRole {
	private Long roleFk;
	private Long roleGroupFk;
}
