package br.com.pwebi.ecommerce.models.dtos;


import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutoInputUpdateDTO {

    private Long produtoId;
    private List<CategoriaDTO> categorias;
    private  String descricaoProduto;
    private  float preco;
    private int quantidadeEstoque;

}
