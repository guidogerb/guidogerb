package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.SecurityRole;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;

import java.util.List;

public interface SecurityService {

	/**
	 * @return the current logged in user
	 */
	SecurityUser getActiveUser();

	/**
	 * return true if the logged in user has this role
	 * this is a convenience pass through to hasAllRoles(Arrays.asList(securityRole))
	 *
	 * @param securityRole the role to test
	 * @return true if they have the role
	 */
	boolean hasRole(SecurityRole securityRole);

	/**
	 * throws exception hasRole is false
	 *
	 * @param securityRole the role to test
	 * @param errorMessage the error message to put in the exception
	 */
	void testHasRole(SecurityRole securityRole, String errorMessage);

	/**
	 * use this only if you don't have a record object, otherwise use hasRecordType()
	 *
	 * @param securityRoles the roles to test for
	 * @return true if the current logged in user has at least one of these roles, false otherwise
	 */
	boolean hasAnyRole(List<SecurityRole> securityRoles);

	/**
	 * throws exception if the user doesn't have any of the roles
	 *
	 * @param securityRoles must have at least one of these roles
	 * @param errorMessage  the exception error message to throw (unit tests should check that this message is received when testing for exceptions)
	 */
	void testHasAnyRole(List<SecurityRole> securityRoles, String errorMessage);

	/**
	 * user has all the passed in roles
	 *
	 * @param securityRoles list of roles to check for
	 * @return true if the user has all of the roles
	 */
	boolean hasAllRoles(List<SecurityRole> securityRoles);

	/**
	 * if !hasRoles() throw exception
	 *
	 * @param securityRoles the roles needed
	 * @param errorMessage  the exception error message to throw (unit tests should check that this message is received when testing for exceptions)
	 */
	void testHasAllRoles(List<SecurityRole> securityRoles, String errorMessage);

}
