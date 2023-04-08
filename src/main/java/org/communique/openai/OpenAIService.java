package org.communique.openai;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.communique.openai.model.*;
import org.communique.openai.repository.OpenAiApiEnginesResponseRepository;
import org.communique.openai.repository.OpenAiApiRequestRepository;
import org.communique.openai.repository.OpenAiApiResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${open.ai.api.key}")
    private String apiKey;

    @Value("${open.ai.api.organization.id}")
    private String organizationId;

    @Autowired
    private OpenAiAPI_ExchangeClient exClient;

    @Autowired
    private OpenAiApiResponseRepository responseRepo;

    @Autowired
    private OpenAiApiRequestRepository requestRepo;

    @Autowired
    private OpenAiApiEnginesResponseRepository enginesRepo;

    public Map<String, String> getHeaders() {
        return new HashMap<>() {{
            put("Authorization", "Bearer " + apiKey);
            put("Content-Type", "application/json");
        }};
    }

    public String getAuthKey() {
        return apiKey;
    }

    public void getEngines() {
        exClient.getEngines(getHeaders()).subscribe(eng -> {
            try {
                enginesRepo.save(new OpenAiApiEnginesResponse(null, LocalDateTime.now(), eng)).subscribe();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public void processApiResponse(ApiRequestBody request) {
        OpenAiApiRequest openAiApiRequest = new OpenAiApiRequest(request);
        requestRepo.save(openAiApiRequest).subscribe();
        exClient.getApiResponse(getHeaders(), request)
                .subscribe(r -> {
                    responseRepo.save(new OpenAiApiResponse(null, LocalDateTime.now(), r)).subscribe();
                });
    }
}