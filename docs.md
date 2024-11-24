# Spring Boot JWT Authentication System

## Project Structure and File Roles

### Configuration

2. `SecurityConfig.java`
    - **Role**: Configures Spring Security for the application.
    - **Location**: `src/main/java/com/example/auth/config/SecurityConfig.java`
    - **Description**: Sets up security rules, authentication manager, password encoder, and JWT authentication filter.

### Security Components

3. `JWTTokenProvider.java`
    - **Role**: Handles JWT token generation, validation, and parsing.
    - **Location**: `src/main/java/com/example/auth/security/JWTTokenProvider.java`
    - **Description**: Provides methods for creating JWT tokens, extracting user information from tokens, and validating tokens.

4. `JwtAuthenticationFilter.java`
    - **Role**: Intercepts and processes JWT authentication for incoming requests.
    - **Location**: `src/main/java/com/example/auth/security/JwtAuthenticationFilter.java`
    - **Description**: Extracts JWT from the request, validates it, and sets up Spring Security context.

5. `CustomUserDetailsService.java`
    - **Role**: Loads user-specific data for authentication.
    - **Location**: `src/main/java/com/example/auth/security/CustomUserDetailsService.java`
    - **Description**: Implements `UserDetailsService` to fetch user details from the database.

6. `UserPrincipal.java`
    - **Role**: Represents the authenticated user for Spring Security.
    - **Location**: `src/main/java/com/example/auth/security/UserPrincipal.java`
    - **Description**: Implements `UserDetails` and wraps the User entity for Spring Security.

### Controllers

7. `AuthController.java`
    - **Role**: Handles authentication-related HTTP requests.
    - **Location**: `src/main/java/com/example/auth/controller/AuthController.java`
    - **Description**: Provides endpoints for user registration and login.

### Models

8. `User.java`
    - **Role**: Represents the User entity in the system.
    - **Location**: `src/main/java/com/example/auth/model/User.java`
    - **Description**: Defines the structure and properties of a user, including username, email, password, and roles.

### Repositories

9. `UserRepository.java`
    - **Role**: Provides database operations for User entities.
    - **Location**: `src/main/java/com/example/auth/repository/UserRepository.java`
    - **Description**: Extends JpaRepository to handle database interactions for users.

### Properties

10. `application.properties`
    - **Role**: Contains application configuration properties.
    - **Location**: `src/main/resources/application.properties`
    - **Description**: Defines database connection details, JWT configuration, and other application-specific settings.

## Usage

1. Register a new user using the `/api/auth/signup` endpoint.
2. Login with the registered user credentials at `/api/auth/signin` to receive a JWT token.
3. Include the JWT token in the `Authorization` header (prefixed with "Bearer ") for subsequent authenticated requests.

## What we need to consider

- Implement proper error handling and logging for security-related events.