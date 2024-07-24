package com.cozycoves.house_rental_service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Apply to all endpoints
                        .allowedOrigins("http://localhost:3000")  // Allow all origins, replace with specific origins if needed
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow specific methods
                        .allowedHeaders("*")  // Allow all headers
                        .allowCredentials(true)  // Allow credentials
                        .maxAge(3600);  // Cache preflight response for 1 hour
            }
        };

    }
}