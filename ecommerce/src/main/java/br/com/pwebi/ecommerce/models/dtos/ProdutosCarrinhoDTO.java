package br.com.pwebi.ecommerce.models.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutosCarrinhoDTO {

    private Long produtoId;
    private Integer quantidade;
    private float ValorTotalProdutos;
}
