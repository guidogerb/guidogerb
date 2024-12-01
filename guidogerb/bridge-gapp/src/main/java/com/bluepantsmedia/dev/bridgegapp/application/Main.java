package com.bluepantsmedia.dev.bridgegapp.application;


import com.bluepantsmedia.dev.bridgegapp.application.config.AppConfig;
import com.bluepantsmedia.dev.bridgegapp.application.controller.EngineController;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.ResourceBundle;

@Configuration
@ComponentScan
public class Main {
    public static final ResourceBundle APPLICATION = ResourceBundle.getBundle("application");

    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.register(AppConfig.class);
        ctx.refresh();
        ctx.getBean(EngineController.class).run(Arrays.asList(args));
    }
}
