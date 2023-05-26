package io.github.Rique25.Vendas.configs;

import io.github.Rique25.Vendas.exceptions.CustomExceptionHandler;
import io.github.Rique25.Vendas.exceptions.Exception403;
import io.github.Rique25.Vendas.jwt.JwtTokenConfigurer;
import io.github.Rique25.Vendas.jwt.JwtTokenProvider;
import io.github.Rique25.Vendas.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtTokenConfigurer tokenConfigurer;

    private static final String[] PUBLIC_MATCHER_GET = { "/*.js", "/*.js.map", "/*.html", "/", "/*.css", "/*.json",
            "/*.woff2", "/*.woff", //
            "/*.png", "/assets/**", "/svg/**", "/actuator/**" };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        authorizeHttpRequests -> authorizeHttpRequests
                                .requestMatchers(
                                        "/**",
                                        "/auth/**",
                                        "/swagger-ui/**",
                                        "/v3/api-docs/**",
                                        "/*.js", "/*.js.map", "/*.html", "/", "/*.css", "/*.json",
                                        "/*.woff2", "/*.woff", //
                                        "/*.png", "/assets/**", "/svg/**", "/actuator/**"
                                ).permitAll()
                                .requestMatchers("/api/**").authenticated()
                                .requestMatchers("/users").denyAll()
                )
                .cors()
                .and()
                .headers().frameOptions().disable()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(new Exception403())
                .and()
                .apply(tokenConfigurer)
                .and()
                .headers().frameOptions().disable()
                .and()
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
