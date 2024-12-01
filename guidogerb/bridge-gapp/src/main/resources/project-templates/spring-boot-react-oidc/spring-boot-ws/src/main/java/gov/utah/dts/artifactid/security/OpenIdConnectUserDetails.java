package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.security;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.common.OAuth2AccessToken;

import java.util.Collection;
import java.util.Collections;

/**
 * Encapsulates OpenID Connect user details.
 *
 * @author chwardle
 */
public class OpenIdConnectUserDetails implements UserDetails {

	private static final long serialVersionUID = -4153740588312462691L;

	private String userId;
	private String email;
	@Getter
	private SecurityUser securityUser;
	private OAuth2AccessToken accessToken;

	public OpenIdConnectUserDetails(Claims userInfo, SecurityUser securityUser, OAuth2AccessToken accessToken) {
		this.userId = (String)userInfo.get("sub");
		this.email = (String)userInfo.get("email");
		this.securityUser = securityUser;
		this.accessToken = accessToken;
	}

	@Override
	public String getUsername() {
		return userId;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
	}

	@Override
	public String getPassword() {
		/**
		 * not relevant for OpenID Connect
		 */
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public OAuth2AccessToken getAccessToken() {
		return accessToken;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.append("userId", userId)
				.append("email", email)
				.append("accessToken", accessToken)
				.toString();
	}
}