package org.communique.openai.controllers;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.observation.annotation.Observed;
import org.communique.openai.model.OpenAiApiRequest;
import org.communique.openai.model.OpenAiApiResponse;
import org.communique.openai.repository.OpenAiApiRequestRepository;
import org.communique.openai.repository.OpenAiApiResponseRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class ApiController {
    private ObservationRegistry observationRegistry;
    private OpenAiApiRequestRepository openAiApiRequestRepository;
    private OpenAiApiResponseRepository openAiApiResponseRepository;

    public ApiController(ObservationRegistry observationRegistry, OpenAiApiRequestRepository openAiApiRequestRepository, OpenAiApiResponseRepository openAiApiResponseRepository) {
        this.observationRegistry = observationRegistry;
        this.openAiApiRequestRepository = openAiApiRequestRepository;
        this.openAiApiResponseRepository = openAiApiResponseRepository;
    }

    // Explicitly wrap a method in an observation
    @GetMapping
    public Flux<OpenAiApiRequest> allApiResquests() {
        return Observation.createNotStarted("openAiApiRequests", observationRegistry)
                .observe(this::allRequestsObserved);
    }

    Flux<OpenAiApiRequest> allRequestsObserved() {
        return openAiApiRequestRepository.findAll();
    }

    // Rely on AOP to wrap the method for observability
    @GetMapping("/{model}")
    @Observed(name="responsesByModel")
    public Mono<OpenAiApiResponse> responseByModel(@PathVariable("model") String model) {
        return openAiApiResponseRepository.findByModel(model)
                .switchIfEmpty(Mono.error(new ModelNotFoundException(model)));
    }

    @PostMapping
    public Mono<OpenAiApiResponse> saveApiResponse(@RequestBody OpenAiApiResponse response) {
        return openAiApiResponseRepository.save(response);
    }

}
