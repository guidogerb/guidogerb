package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums;

import lombok.Getter;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;


public enum SecurityRole implements Serializable {

	ROLE_1(Constants.ROLE_1)
	, ROLE_2(Constants.ROLE_2)
	;

	@Getter
	private final String role;

	/**
	 * enum internal use constructor for assign string role name to an enum role
	 * this way string constant version can be used in Spring Security Annotations and enum can be used in plain java code
	 *
	 * @param role the role string name for this enum value
	 */
	SecurityRole(String role) {
		this.role = role;
	}

	/**
	 * list of all roles for this enum (helper to convert to List instead of SecurityRole[])
	 *
	 * @return List of all the roles
	 */
	public static List<SecurityRole> allRoles() {
		return Arrays.asList(values());
	}

	/**
	 * given a string role name (usually from umdPerson spring security Role list) return the SecurityRole enum value
	 *
	 * @param name role name of the SecurityRole enum
	 * @return SecurityRole matching the name
	 */
	public static SecurityRole roleFormName(String name) {
		return allRoles().stream().filter(r -> name.equals(r.getRole())).findFirst().orElse(null);
	}

	public static class Constants {


		private static final String ROLE_1 = "role-1";
		private static final String ROLE_2 = "role-2";

		private Constants() {
			throw new RuntimeException("No thank you!");
		}
	}
}
