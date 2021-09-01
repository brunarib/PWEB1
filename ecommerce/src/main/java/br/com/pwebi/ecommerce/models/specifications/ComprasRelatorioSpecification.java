package br.com.pwebi.ecommerce.models.specifications;

import br.com.pwebi.ecommerce.models.entities.ComprasViewEntity;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public  final class ComprasRelatorioSpecification {


        public static Specification<ComprasViewEntity> withCompraIdEquals(Long compraId) {
            return (root, query, cb) -> compraId == null  ?
                    null : cb.equal(root.get("compraId"), compraId);
        }

    public static Specification<ComprasViewEntity> withClienteIdEquals(Long clienteId) {
        return (root, query, cb) -> clienteId == null  ?
                null : cb.equal(root.get("clienteId"), clienteId);
    }

    public static Specification<ComprasViewEntity> withProdutoIdEquals(Long produtoId) {
        return (root, query, cb) -> produtoId == null  ?
                null : cb.equal(root.get("produtoId"), produtoId);
    }

        public static Specification<ComprasViewEntity> withStatusEqual(String status) {
            return (root, query, cb) -> status == null ?
                    null : cb.equal(root.get("status"), status);
        }

        public static Specification<ComprasViewEntity> withStartDateGreaterThan( LocalDateTime inicio) {
            return (root, query, cb) -> inicio == null ?
                    null : cb.greaterThanOrEqualTo(root.get(
                            "dataCompra"), inicio);
        }

        public static Specification<ComprasViewEntity> withCreatedAtLessThan( LocalDateTime fim) {
            return (root, query, cb) -> fim == null ?
                    null :
                    cb.lessThanOrEqualTo(root.get("dataCompra"),
                            fim);
        }

}
