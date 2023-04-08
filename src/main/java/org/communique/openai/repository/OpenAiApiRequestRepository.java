package org.communique.openai.repository;

import org.communique.openai.model.OpenAiApiRequest;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import io.micrometer.observation.annotation.Observed;
//import reactor.core.publisher.Mono;

@Observed(name="openAiApiRequests")
public interface OpenAiApiRequestRepository extends ReactiveCrudRepository<OpenAiApiRequest, Long> {
        //Mono<OpenAiApiRequest> findByModel(String model);
}
