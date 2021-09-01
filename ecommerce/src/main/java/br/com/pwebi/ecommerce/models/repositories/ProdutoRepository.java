package br.com.pwebi.ecommerce.models.repositories;

import br.com.pwebi.ecommerce.models.entities.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProdutoRepository extends JpaRepository<ProdutoEntity,
        Long> {


    @Query(nativeQuery = true, value = "select * from produto " +
            "where " +
            "produto_id = :id")
    ProdutoEntity customFindById(@Param("id") Long id);
}
