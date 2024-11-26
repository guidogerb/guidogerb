package org.ggp.config;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.ollama.OllamaEmbeddingModel;
import org.springframework.ai.ollama.api.OllamaApi;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

@Configuration
public class BeansConfig {

    @Autowired
    private Environment env;

    @Bean
    @Primary
    public EmbeddingModel ollamaEmbeddingModel() {
        String ollamaUrl = env.getProperty("pring.ai.ollama.base-url");
        OllamaApi api = new OllamaApi(ollamaUrl);
        OllamaOptions options = new OllamaOptions();
        // set options
        return new OllamaEmbeddingModel(api, options,null,null);
    }

}
