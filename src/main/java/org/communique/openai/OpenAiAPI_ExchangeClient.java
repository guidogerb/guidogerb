package org.communique.openai;

import org.communique.openai.model.Engines;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import reactor.core.publisher.Mono;

import java.util.Map;

@HttpExchange(url = "https://api.openai.com")
public interface OpenAiAPI_ExchangeClient {

    @GetExchange("/v1/engines")
    Mono<Engines> getEngines(@RequestHeader Map<String, String> headers);

}
