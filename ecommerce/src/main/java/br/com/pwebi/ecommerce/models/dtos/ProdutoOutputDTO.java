package br.com.pwebi.ecommerce.models.dtos;

import lombok.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutoOutputDTO {

    private Long produtoId;
    private List<CategoriaDTO> categoria;
    private  String descricaoProduto;
    private  float preco;
    private int quantidadeEstoque;
}
