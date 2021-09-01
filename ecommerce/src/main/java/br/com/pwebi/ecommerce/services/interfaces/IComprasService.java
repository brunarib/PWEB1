package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.entities.ComprasViewEntity;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface IComprasService {

    List<ComprasViewEntity> findAll(Specification<ComprasViewEntity> specification);
}
