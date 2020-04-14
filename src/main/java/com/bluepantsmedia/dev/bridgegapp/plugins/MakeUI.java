package com.bluepantsmedia.dev.bridgegapp.plugins;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;

/**
 * Says "Hi" to the user.
 */
@Mojo(name = "sayhi")
public class MakeUI extends AbstractMojo {
    public void execute() throws MojoExecutionException {
        getLog().info("Hello, world.");
    }
}