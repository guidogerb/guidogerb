package org.communique.commands;

import org.communique.openai.OpenAIService;
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
        openAIService.getEngines(terminal);
        terminal.flush();
    }

    @ShellMethod(value = "Say hello.", key = "hello")
    public String helloWorld(
            @ShellOption(defaultValue = "world") String arg
    ) {
        return "Hello " + arg;
    }

}
