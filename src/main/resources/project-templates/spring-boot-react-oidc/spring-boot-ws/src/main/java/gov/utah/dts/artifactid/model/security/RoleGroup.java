package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

// a role group represents a collection of roles meaning that something belonging to this group can do whatever roles the group has
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@SuppressWarnings("unused")
public class RoleGroup implements Serializable {
	private Long roleGroupPk;
	private String name;
	private String description;

	// Non-DB fields
	private String roleFks;
}
