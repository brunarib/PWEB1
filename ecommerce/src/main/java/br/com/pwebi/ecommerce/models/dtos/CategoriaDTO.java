package br.com.pwebi.ecommerce.models.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaDTO {

    private Long categoriaId;
    private String descricao;

}
