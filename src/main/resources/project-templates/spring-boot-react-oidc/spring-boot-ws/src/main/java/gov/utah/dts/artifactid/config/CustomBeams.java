package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
@Order(1000)
public class CustomBeams extends WebSecurityConfigurerAdapter {

	@Bean
	public Gson gson() {
		return new GsonBuilder().create();
	}

}