package com.example.projetglsi3.Auth.Config;

import com.example.projetglsi3.Auth.Security.JWTAuthentificationFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public JWTAuthentificationFilter JWTAuthentificationFilter(){
        return new JWTAuthentificationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
<<<<<<< HEAD
                        auth
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/rides/**").permitAll()
                                .requestMatchers("/api/reservation/**").permitAll()
                                .requestMatchers("/api/reservation/reserve/**").permitAll()
                                .requestMatchers("/api/reservation/cancel/**").permitAll()
                                .anyRequest().authenticated()
=======
                    auth
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers("/api/rides/**").permitAll()
                            .anyRequest().authenticated()
>>>>>>> 046645e23fd3c564e81dfb5d9d203a24106e88ac
                );
        http.addFilterBefore(JWTAuthentificationFilter(),UsernamePasswordAuthenticationFilter.class);
        System.out.println("SecurityFilterChain invoked for: " + http);

        return http.build();
    }

}