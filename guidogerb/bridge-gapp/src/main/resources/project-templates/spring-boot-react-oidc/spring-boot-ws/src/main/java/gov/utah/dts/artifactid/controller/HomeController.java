package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.controller;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.WebserviceResponse;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.security.OpenIdConnectUserDetails;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.ErrorLogService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.VersionServiceImpl;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security.SecurityService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util.WebserviceResponseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@CrossOrigin
public class HomeController {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private VersionServiceImpl versionService;
	@Autowired
	private SecurityService securityService;
	@Autowired
	private WebserviceResponseService webserviceResponseService;
	@Autowired
	private ErrorLogService errorLogService;

	@Value("${security.oauth2.resource.user-info-uri}")
	private String userInfoUri;

	@GetMapping("/")
	public String index() {
		return "version: " + versionService.getVersion();
	}

	@GetMapping(value = "/api/version.txt")
	@ResponseBody
	String versionEndpoint() {
		return versionService.getVersion();
	}
	
	@GetMapping("/userInfo")
	public String userInfo() {

		final String username = SecurityContextHolder.getContext().getAuthentication().getName();
		log.info("Authenticated Username: {}", username);

		final OpenIdConnectUserDetails userDetails = (OpenIdConnectUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		log.info("Authentication Principal: {}", userDetails);

		final Map openAmUserInfo = getUserInfo(userDetails);
		log.info("UserInfo endpoint response: {}", openAmUserInfo);

		return "<h2>Secured Homepage</h2>User Id: " + userDetails.getUsername()
				+ (userDetails.getEmail() != null ? "<p>Email: " + userDetails.getEmail() : "")
				+ (openAmUserInfo.get("name") != null ? "<p>Name: " + openAmUserInfo.get("name") : "")
				+ (openAmUserInfo.get("uid") != null ? "<p>UID: " + openAmUserInfo.get("uid") : "")
				+ (openAmUserInfo.get("account_type") != null ? "<p>Account Type: " + openAmUserInfo.get("account_type") : "")
				;
	}

	@GetMapping("/user")
	public WebserviceResponse<SecurityUser> user() {
		return webserviceResponseService.response(securityService.getActiveUser(), null);
	}

	@PostMapping(value = "/error.json")
	@ResponseBody
	public WebserviceResponse<String> error(@RequestBody Object error) {
		return errorLogService.handleClientError(error);
	}

	@PostMapping(value = "clientError")
	public WebserviceResponse<String> clientErrorHandler(@RequestBody final Map<String,Object> error ) {
		return errorLogService.handleClientError((String) error.get("error"), (Boolean) error.get("isTest"));
	}

	private Map getUserInfo(OpenIdConnectUserDetails userDetails) {
		final RestTemplate restTemplate = new RestTemplate();
		final HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("Authorization", "Bearer " + userDetails.getAccessToken());
		final HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
		final ResponseEntity<Map> userInfoResponseEntity = restTemplate.exchange(userInfoUri, HttpMethod.GET, httpEntity, Map.class);
		return userInfoResponseEntity.getBody();
	}
}
