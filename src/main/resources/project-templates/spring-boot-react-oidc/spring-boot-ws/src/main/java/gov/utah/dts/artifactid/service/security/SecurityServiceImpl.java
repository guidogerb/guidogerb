package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security;

import lombok.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.SecurityRole;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.UserMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.security.OpenIdConnectUserDetails;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class SecurityServiceImpl implements SecurityService {

	private final UserMapper userMapper;

	public SecurityServiceImpl(@NonNull final UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public SecurityUser getActiveUser() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		SecurityUser securityUser = null;
		if (authentication != null) {
			if (authentication.getPrincipal() instanceof String) {
				// anonymous user
				securityUser = new SecurityUser();
			} else {
				securityUser = ((OpenIdConnectUserDetails) authentication.getPrincipal()).getSecurityUser();
			}
		}

		// may have not yet been inserted
		if (securityUser != null && securityUser.getUmdPersonPk() == null) {
			final SecurityUser foundSecurityUser = userMapper.selectUserByUid(securityUser.getUid());
			if (foundSecurityUser == null) {
				userMapper.insertUser(securityUser);
				securityUser = userMapper.selectUserByUid(securityUser.getUid());
			} else {
				securityUser = foundSecurityUser;
			}
		}

		return securityUser;
	}

	@Override
	public boolean hasAnyRole(List<SecurityRole> securityRoles) {
		return securityRoles.stream().anyMatch(this::hasRole);
	}

	@Override
	public void testHasAnyRole(List<SecurityRole> securityRoles, String errorMessage) {
		if (!hasAnyRole(securityRoles)) {
			throwSecurityException(errorMessage);
		}
	}

	@Override
	public boolean hasRole(SecurityRole securityRole) {
		return hasAllRoles(Collections.singletonList(securityRole));
	}

	@Override
	public void testHasRole(SecurityRole securityRole, String errorMessage) {
		if (!hasRole(securityRole)) {
			throwSecurityException(errorMessage);
		}
	}

	@Override
	public boolean hasAllRoles(List<SecurityRole> securityRoles) {
		final SecurityUser securityUser = getActiveUser();
		return securityUser != null && securityRoles.stream().allMatch(securityRole -> securityUser.getRoles().contains(securityRole.getRole()));
	}

	@Override
	public void testHasAllRoles(List<SecurityRole> securityRoles, String errorMessage) {
		if (!hasAllRoles(securityRoles)) {
			throwSecurityException(errorMessage);
		}
	}

	private void throwSecurityException(String errorMessage) {
		throw new SecurityException(errorMessage);
	}

}
