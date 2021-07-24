package br.com.pwebi.ecommerce.models.dtos;


import br.com.pwebi.ecommerce.models.entities.CategoriaEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutoInputDTO {

    private CategoriaDTO categoria;
    private  String descricaoProduto;
    private  float preco;
    private int quantidadeEstoque;

}
