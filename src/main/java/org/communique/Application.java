package org.communique;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import javax.sql.DataSource;
import org.communique.data.service.SamplePersonRepository;
import org.communique.openai.OpenAIService;
import org.communique.openai.OpenAiAPI_ExchangeClient;
import org.communique.openai.model.Engines;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.sql.init.SqlDataSourceScriptDatabaseInitializer;
import org.springframework.boot.autoconfigure.sql.init.SqlInitializationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "communique")
@NpmPackage(value = "@adobe/lit-mobx", version = "2.0.0")
@NpmPackage(value = "mobx", version = "^6.3.5")
@NpmPackage(value = "@vaadin-component-factory/vcf-nav", version = "1.1.0")
@PWA(name = "Communique", shortName = "Communique",
        offlineResources = {"images/empty-plant.png", "images/empty-plant.png"})
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    SqlDataSourceScriptDatabaseInitializer dataSourceScriptDatabaseInitializer(DataSource dataSource,
            SqlInitializationProperties properties, SamplePersonRepository repository) {
        // This bean ensures the database is only initialized when empty
        return new SqlDataSourceScriptDatabaseInitializer(dataSource, properties) {
            @Override
            public boolean initializeDatabase() {
                if (repository.count() == 0L) {
                    return super.initializeDatabase();
                }
                return false;
            }
        };
    }

    @Bean
    ApplicationRunner go(OpenAIService openAIService) {
        return args -> {
            System.out.println("start here");
            WebClient newOne = WebClient.builder()
                    .baseUrl("https://api.openai.com/v1/engines")
                    .defaultCookie("cookie-name", "cookie-value")
                    .defaultHeader("Authorization", "Bearer " + openAIService.getAuthKey())
                    .build();
            newOne.get().retrieve().bodyToMono(Engines.class).subscribe(engines -> {
                System.out.println(" ** " + engines);
                    });
            WebClient.create("https://api.openai.com")
                .get()
                .uri("/v1/engines")
                .header("Authorization", "Bearer " + openAIService.getAuthKey())
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(engines -> {
                    System.out.println(" ** " + engines);
                }).subscribe();
            openAIService.getEngines();
            System.out.println("stop here");
        };
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

}
