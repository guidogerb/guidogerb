package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.config;

import com.bluepantsmedia.dev.bridgegappeng.oidc.OidcService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.RoleMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.UserMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.security.filter.JdbcOidcBearerTokenFilter;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.GET;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private JdbcOidcBearerTokenFilter filter;

	@Autowired
	public WebSecurityConfig(@Value("${security.oauth2.client.well-known-url}") String wellKnown, UserService userService, RoleMapper roleMapper, UserMapper userMapper) {
		this.filter = new JdbcOidcBearerTokenFilter(new OidcService(wellKnown), userService,"Authorization", roleMapper, userMapper);
	}

	@Override
	public void configure(WebSecurity webSecurity) {
		webSecurity
				.ignoring()
				.antMatchers("/resources/**", "/canary/**", "/error", "/403.html", "/version.txt");
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				.cors().configurationSource(corsConfigurationSource())
				.and()
				.csrf().disable()
				.addFilterAfter(new OAuth2ClientContextFilter(), AbstractPreAuthenticatedProcessingFilter.class)
				.addFilterAfter(this.filter, OAuth2ClientContextFilter.class)
				.authorizeRequests()
				/** Most restrictive first */
				.antMatchers(GET, "/canaryDetail/**", "/canarydetail/**").hasAnyAuthority("admin")
				.antMatchers(GET, "/userInfo").authenticated()
				.antMatchers(GET, "/").permitAll()
		;
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowCredentials(Boolean.TRUE);
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;

	}
}