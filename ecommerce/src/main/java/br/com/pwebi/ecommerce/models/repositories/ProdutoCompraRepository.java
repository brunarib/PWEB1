package br.com.pwebi.ecommerce.models.repositories;



import br.com.pwebi.ecommerce.models.entities.ProdutoCompraEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoCompraRepository extends JpaRepository<ProdutoCompraEntity
        , Long> {
}
