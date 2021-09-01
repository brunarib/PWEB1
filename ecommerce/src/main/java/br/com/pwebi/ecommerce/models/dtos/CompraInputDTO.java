package br.com.pwebi.ecommerce.models.dtos;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompraInputDTO {


    private Long clienteId;
    private float valorTotalCompra;
    private List<ProdutosCarrinhoDTO> listaProdutos;



}
