package com.bluepantsmedia.dev.bridgegapp.application.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Use this config class for creating global beans by hand
@Configuration
public class CustomBeansConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
	public Gson gson() {
        return new Gson();
    }
}
