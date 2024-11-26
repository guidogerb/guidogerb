package org.ggp.cli;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;


@Component
public class CLIRunner implements CommandLineRunner {

    private final Map<String, Runnable> commandMap = new HashMap<>();

    public CLIRunner() {
        // Register commands
        commandMap.put("help", this::printAvailableCommands);
        commandMap.put("hello", this::sayHello);
        commandMap.put("exit", this::exitApp);
    }

    @Override
    public void run(String... args) {
        if (args.length == 0) {
            System.out.println("No command provided.");
            return;
        }

        try (Scanner scanner = new Scanner(System.in)) {
            while (true) {
                System.out.print("> "); // Command prompt symbol
                String input = scanner.nextLine().trim();

                if (input.isEmpty()) {
                    continue; // Skip empty lines
                }

                // Parse the command and arguments
                String[] parts = input.split("\\s+");
                String command = parts[0].toLowerCase();

                Runnable action = commandMap.get(command);

                if (action != null) {
                    action.run();
                } else {
                    System.out.println("Unknown command: " + command);
                    printAvailableCommands();
                }
            }
        }
    }

    private void sayHello() {
        System.out.println("Hello from the GuidoGerb CLI!");
    }

    private void exitApp() {
        System.out.println("Exiting the application...");
        System.exit(0);
    }

    private void printAvailableCommands() {
        System.out.println("Available commands: " + String.join(", ", commandMap.keySet()));
    }
}