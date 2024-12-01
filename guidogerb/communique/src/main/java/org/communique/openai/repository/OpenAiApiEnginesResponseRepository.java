package org.communique.openai.repository;

import io.micrometer.observation.annotation.Observed;
import org.communique.openai.model.OpenAiApiEnginesResponse;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

@Observed(name="openAiApiEnginesResponses")
public interface OpenAiApiEnginesResponseRepository extends ReactiveCrudRepository<OpenAiApiEnginesResponse, Long> {
}
