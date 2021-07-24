package br.com.pwebi.ecommerce.models.repositories;

import br.com.pwebi.ecommerce.models.entities.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<ProdutoEntity,
        Long> {
}
