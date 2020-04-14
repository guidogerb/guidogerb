package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.security.filter;

import com.bluepantsmedia.dev.bridgegappeng.oidc.OidcService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.RoleMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.UserMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.security.Role;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.security.OpenIdConnectUserDetails;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.empty;

public class JdbcOidcBearerTokenFilter extends GenericFilterBean {
    private final OidcService oidcService;
    private final UserService userService;
    private final RoleMapper roleMapper;
    private final String headerName;
    private final UserMapper userMapper;

    public JdbcOidcBearerTokenFilter(
			@NonNull final OidcService oidcService,
			@NonNull final UserService userService,
			@NonNull final String headerName,
			@NonNull final RoleMapper roleMapper,
			@NonNull final UserMapper userMapper) {
        this.oidcService = oidcService;
        this.userService = userService;
        this.headerName = headerName;
        this.roleMapper = roleMapper;
        this.userMapper = userMapper;
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        final String jwtString = StringUtils.replaceAll(httpServletRequest.getHeader(this.headerName), "Bearer", "");

        if (!StringUtils.isEmpty(jwtString)) {
            final Claims claims = this.oidcService.validateJwt(jwtString);
			grantUserAuthority(claims, new DefaultOAuth2AccessToken(jwtString));
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

	/**
	 * Grants a userInfo access to the system based on their associated role
	 *
	 * @param openIdMap map
	 * @return a PreAuthenticatedAuthenticationToken representing the user's access in the system
	 */
	private void grantUserAuthority(Claims openIdMap, OAuth2AccessToken accessToken) {
		SecurityUser securityUser = userService.findByUid((String) openIdMap.get("uid"));

		if (securityUser == null) {
			securityUser = new SecurityUser();
			securityUser.setUid(openIdMap.get("uid").toString());
			securityUser.setFirstName(openIdMap.get("given_name").toString());
			securityUser.setLastName(openIdMap.get("family_name").toString());
			securityUser.setEmail(openIdMap.get("email").toString());
		} else {
			securityUser.setFirstName(openIdMap.get("given_name").toString());
			securityUser.setLastName(openIdMap.get("family_name").toString());
			securityUser.setEmail(openIdMap.get("email").toString());
			userMapper.updateUser(securityUser);
		}

		securityUser.setRoles(roleMapper.selectRolesForUserPk(securityUser.getUmdPersonPk()).stream().map(Role::getName).collect(Collectors.toList()));

		final List<GrantedAuthority> authList = securityUser.getRoles().stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

		refreshSpringSecurityToken(new OpenIdConnectUserDetails(openIdMap, securityUser, accessToken), authList);
	}

	/**
	 * Refreshes the security token for the user according to the granted authority list
	 *
	 * @param user
	 * @param authList
	 */
	private void refreshSpringSecurityToken(OpenIdConnectUserDetails user, List<GrantedAuthority> authList) {
		PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(user, empty(), authList);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
