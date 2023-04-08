package org.communique.openai;

import org.communique.openai.model.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;

import java.util.Map;

@HttpExchange(url = "https://api.openai.com")
public interface OpenAiAPI_ExchangeClient {

    @GetExchange("/v1/engines")
    Mono<Engines> getEngines(@RequestHeader Map<String, String> headers);

    @PostExchange("/v1/completions")
    Mono<ApiResponse> getApiResponse(@RequestHeader Map<String, String> headers, @RequestBody ApiRequestBody request);

}
