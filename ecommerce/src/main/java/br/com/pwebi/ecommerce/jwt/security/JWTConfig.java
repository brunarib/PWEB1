package br.com.pwebi.ecommerce.jwt.security;

import br.com.pwebi.ecommerce.services.impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@EnableWebSecurity
public class JWTConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsServiceImpl userDetails;

    private final PasswordEncoder passwordEncoder;

    public JWTConfig(UserDetailsServiceImpl userDetails, PasswordEncoder passwordEncoder) {
        this.userDetails = userDetails;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.userDetailsService(userDetails).passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**",
                "/clientes/usuarioCadastro",
                "/produtos",
                "/categorias");
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable().cors().configurationSource(corsConfigurationSource())
                .and().authorizeRequests()
                .antMatchers(HttpMethod.POST,"/login").permitAll()
                .anyRequest().authenticated()

                .and()

                .addFilter(new JWTAutenticarFilter(authenticationManager()))
                .addFilter(new JWTValidarFilter(authenticationManager()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);


    }





    @Bean
    CorsConfigurationSource corsConfigurationSource(){

        final UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = getCorsConfiguration();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

    private CorsConfiguration getCorsConfiguration(){
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("GET");
        corsConfiguration.addAllowedMethod("POST");
        corsConfiguration.addAllowedMethod("PATCH");
        corsConfiguration.addAllowedMethod("PUT");
        corsConfiguration.addAllowedMethod("DELETE");
        corsConfiguration.addAllowedMethod("OPTIONS");
        corsConfiguration.addAllowedMethod("UPDATE");
        corsConfiguration.addExposedHeader("Authorization");
        return corsConfiguration;
    }



}