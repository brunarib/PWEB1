package br.com.pwebi.ecommerce.models.assemblers;

import br.com.pwebi.ecommerce.models.dtos.ComprasRelatorioFiltrosDTO;
import br.com.pwebi.ecommerce.models.entities.ComprasViewEntity;
import br.com.pwebi.ecommerce.models.specifications.ComprasRelatorioSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class ComprasAssembler {

    public Specification<ComprasViewEntity> parseSpecificationFilter(ComprasRelatorioFiltrosDTO dto) {
        return Specification
                .where(ComprasRelatorioSpecification.withCompraIdEquals(dto.getCompraId()))
                .and(ComprasRelatorioSpecification.withClienteIdEquals(dto.getCliente()))
                .and(ComprasRelatorioSpecification.withProdutoIdEquals(dto.getProdutoId()))
                .and(ComprasRelatorioSpecification.withStartDateGreaterThan(dto.getInicioPeriodo()))
                .and(ComprasRelatorioSpecification.withCreatedAtLessThan(dto.getFimPeriodo()))
                .and(ComprasRelatorioSpecification.withStatusEqual(dto.getStatus()));

    }
}
