package br.com.pwebi.ecommerce.jwt;

import br.com.pwebi.ecommerce.models.PermissaoUsuario;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class UserDetailsImpl implements UserDetails {

    private final Optional<UsuarioEntity> usuario;

    public UserDetailsImpl(Optional<UsuarioEntity> usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return new ArrayList<>();
    }

    @Override
    public String getPassword() {
        return usuario.orElse(new UsuarioEntity()).getSenha();

    }

    @Override
    public String getUsername() {
        return usuario.orElse(new UsuarioEntity()).getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
