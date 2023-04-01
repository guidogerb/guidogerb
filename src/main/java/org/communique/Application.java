package org.communique;

import org.communique.commands.CustomExceptionResolver;
import org.communique.openai.OpenAiAPI_ExchangeClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	HttpServiceProxyFactory httpServiceProxyFactory() {
		WebClient webClient = WebClient.create();
		WebClientAdapter webClientAdapter = WebClientAdapter.forClient(webClient);
		return HttpServiceProxyFactory.builder(webClientAdapter).build();
	}

	@Bean
	OpenAiAPI_ExchangeClient openAiAPIClient(HttpServiceProxyFactory httpServiceProxyFactory) throws Exception {
		return httpServiceProxyFactory.createClient(OpenAiAPI_ExchangeClient.class);
	}

	@Bean
	CustomExceptionResolver customExceptionResolver() {
		return new CustomExceptionResolver();
	}

}
