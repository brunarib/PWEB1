package br.com.pwebi.ecommerce.jwt.security;

import br.com.pwebi.ecommerce.jwt.UserDetailsImpl;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public static final int TOKEN_EXPIRACAO = 864_000_000;

    public static final String TOKEN_SEGREDO ="eee6109e-cb2c-4b91-9002-09d7f4f8b90a";

    public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {
            UsuarioEntity usuarioEntity =
                    new ObjectMapper().readValue(request.getInputStream(),
                            UsuarioEntity.class);

            return  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    usuarioEntity.getLogin(),
                    usuarioEntity.getSenha(),
                    new ArrayList<>()
            ));
        } catch (IOException e) {
           throw  new RuntimeException("Falha ao autenticar o usuário!",e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        UserDetailsImpl userDetails =
                (UserDetailsImpl)  authResult.getPrincipal();

        String token = JWT.create()
                .withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRACAO))
                .sign(Algorithm.HMAC512(TOKEN_SEGREDO));
        response.getWriter().write(token);
        response.getWriter().flush();
    }
}
