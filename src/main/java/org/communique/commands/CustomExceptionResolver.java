package org.communique.commands;

import org.springframework.shell.command.CommandExceptionResolver;
import org.springframework.shell.command.CommandHandlingResult;

public class CustomExceptionResolver implements CommandExceptionResolver {

    @Override
    public CommandHandlingResult resolve(Exception e) {
        if (e instanceof RuntimeException) {
            return CommandHandlingResult.of("Handled runtime exception:\n" + e.toString(), 42);
        }
        else if (e instanceof Exception) {
            return CommandHandlingResult.of("Handled exception:\n" + e.toString(), 42);
        }
        return null;
    }
}
