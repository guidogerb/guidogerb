package org.communique.openai.repository;

import io.micrometer.observation.annotation.Observed;
import org.communique.openai.model.OpenAiApiRequest;
import org.communique.openai.model.OpenAiApiResponse;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

@Observed(name="openAiApiResponses")
public interface OpenAiApiResponseRepository extends ReactiveCrudRepository<OpenAiApiResponse, Long> {
        Mono<OpenAiApiResponse> findByModel(String model);
}
