package br.com.pwebi.ecommerce.models.dtos;


import br.com.pwebi.ecommerce.models.entities.CategoriaEntity;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutoInputDTO {

    private List<CategoriaDTO> categorias;
    private  String descricaoProduto;
    private  float preco;
    private int quantidadeEstoque;

}
