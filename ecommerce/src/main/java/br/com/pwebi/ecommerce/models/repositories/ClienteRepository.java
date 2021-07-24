package br.com.pwebi.ecommerce.models.repositories;

import br.com.pwebi.ecommerce.models.entities.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<ClienteEntity,Long> {
}
