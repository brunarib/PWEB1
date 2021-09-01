package br.com.pwebi.ecommerce.models.repositories;

import br.com.pwebi.ecommerce.models.entities.ComprasViewEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ComprasViewRepository extends JpaRepository<ComprasViewEntity, Long>
        , JpaSpecificationExecutor<ComprasViewEntity> {

    //List<ComprasViewEntity> findAll(Specification specification);
}
