package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.jwt.UserDetailsImpl;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import br.com.pwebi.ecommerce.models.repositories.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


    private final UsuarioRepository repository;

    public UserDetailsServiceImpl(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        Optional<UsuarioEntity> usuarioEntity = this.repository.findByLogin(login);
        if(!usuarioEntity.isPresent()){
            throw new UsernameNotFoundException("Usuário Não Encontrado!");
        }
        return new UserDetailsImpl(usuarioEntity) {
        };
    }
}
