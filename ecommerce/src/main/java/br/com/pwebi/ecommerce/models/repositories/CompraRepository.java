package br.com.pwebi.ecommerce.models.repositories;


import br.com.pwebi.ecommerce.models.entities.CompraEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompraRepository extends JpaRepository<CompraEntity, Long> {
}
