package org.communique.commands;

import org.communique.openai.OpenAIService;
import org.communique.openai.model.OpenAiApiRequest;
import org.communique.openai.model.ApiRequestBody;
import org.jline.terminal.Terminal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

@ShellComponent
public class Commands {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    Terminal terminal;

    @ShellMethod(value = "List OpenAI Engines.", key = "l")
    public void listEngines() {
        terminal.writer().println("\n\nEngines: ");
        openAIService.getEngines();
        terminal.flush();
    }

    @ShellMethod(value = "Get OpenAI Response.", key = {"get","g"})
    public void getResponse(
            @ShellOption(defaultValue = "Hello, which language model are you? Be brief.") String prompt,
            @ShellOption(defaultValue = "text-davinci-003") String model,
            @ShellOption(defaultValue = "10") int maxTokens
    ) {
        terminal.writer().println("\n\nResponse: ");
        openAIService.processApiResponse(new ApiRequestBody(prompt, model, maxTokens));
        terminal.flush();
    }

    @ShellMethod(value = "Say hello.", key = "hello")
    public String helloWorld(
            @ShellOption(defaultValue = "world") String arg
    ) {
        return "Hello " + arg;
    }

    @ShellMethod(value = "Quit application.", key = {"q", "quit"})
    public void quit() {
        terminal.writer().println("\n\nGoodbye!");
        terminal.flush();
        System.exit(0);
    }

    @ShellMethod(value = "Exit application.", key = {"e", "exit"})
    public void exit() {
        terminal.writer().println("\n\nGoodbye!");
        terminal.flush();
        System.exit(0);
    }

}
