package br.com.pwebi.ecommerce.models.repositories;

import br.com.pwebi.ecommerce.models.entities.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<CategoriaEntity,
        Long> {
}
