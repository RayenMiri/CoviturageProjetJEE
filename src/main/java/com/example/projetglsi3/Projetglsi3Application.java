package com.example.projetglsi3;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Projetglsi3Application {

    public static void main(String[] args) {
        // Load the .env file
        Dotenv dotenv = Dotenv.load();

        // Debugging output to check if variables are loaded
        System.out.println("JWT_SECRET_KEY fromTEST 123 .env: " + dotenv.get("JWT_SECRET_KEY"));
        System.out.println("JWT_EXPIRATION_IN_MS from .env: " + dotenv.get("JWT_EXPIRATION_IN_MS"));

        // Set the properties in the System Environment
        System.setProperty("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY"));
        System.setProperty("JWT_EXPIRATION_IN_MS", dotenv.get("JWT_EXPIRATION_IN_MS"));

        SpringApplication.run(Projetglsi3Application.class, args);
    }
}
