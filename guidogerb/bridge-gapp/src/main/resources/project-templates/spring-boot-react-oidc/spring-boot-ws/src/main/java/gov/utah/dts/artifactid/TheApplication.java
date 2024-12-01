package com.bluepantsmedia.dev.bridgegapp.#{artifact-id};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration;

/**
 * Add @ServletComponentScan("com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.canary") if jar deploy to pick up @webfilter @weblistener
 */
//@ServletComponentScan("com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.canary")
@SpringBootApplication(exclude = RepositoryRestMvcAutoConfiguration.class)
public class TheApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheApplication.class, args);
	}
	
}
