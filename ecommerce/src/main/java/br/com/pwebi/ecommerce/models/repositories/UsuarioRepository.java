package br.com.pwebi.ecommerce.models.repositories;

import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity,Long> {

    Optional<UsuarioEntity> findByLogin(String login);
}
