package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.URL;

import static org.hamcrest.Matchers.containsString;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class HomeControllerIT {

	@LocalServerPort
	private int port;

	private URL base;

	@Value("${server.servlet.contextPath}")
	protected String contextPath;

	@Autowired
	private TestRestTemplate template;

	@Before
	public void setUp() throws Exception {
		this.base = new URL("http://localhost:" + port + contextPath + "/");
	}

	@Test
	public void getHello() throws Exception {
		ResponseEntity<String> response = template.getForEntity(base.toString(), String.class);
		assertThat(response.getBody(), containsString("version:"));
	}
}
