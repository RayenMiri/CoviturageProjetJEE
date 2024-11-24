package com.example.projetglsi3.Auth.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWTTokenProvider {

    private final Key jwtSecretKey;

    @Value("${JWT_EXPIRATION_IN_MS}")
    private int jwtExpirationInMs;

    public JWTTokenProvider() {
        // Generate a secure key
        this.jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        System.out.println("JWT Secret Key generated successfully.");
        System.out.println("JWT Expiration in Ms: " + jwtExpirationInMs);
    }

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        // Use `JwtParserBuilder` for parsing
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            // Use `JwtParserBuilder` for validation
            Jwts.parser()
                    .setSigningKey(jwtSecretKey)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (JwtException ex) {
            // Log specific error (e.g., SignatureException, ExpiredJwtException, etc.)
        } catch (IllegalArgumentException ex) {
            // Log error
        }
        return false;
    }
}
