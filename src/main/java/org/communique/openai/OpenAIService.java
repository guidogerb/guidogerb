package org.communique.openai;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jline.terminal.Terminal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${open.ai.api.key}")
    private String apiKey;

    @Autowired
    private OpenAiAPI_ExchangeClient exClient;

    public Map<String,String> getHeaders() {
        return new HashMap<>() {{
            put("Authorization", "Bearer " + apiKey);
            put("Content-Type", "application/json");
        }};
    }

    public String getAuthKey() {
        return apiKey;
    }

    public void getEngines(Terminal terminal) {
        exClient.getEngines(getHeaders()).subscribe(Engines -> {
            ObjectMapper mapper = new ObjectMapper();
            try {
                terminal.writer().println(mapper.writeValueAsString(Engines));
                terminal.flush();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

}
