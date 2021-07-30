package br.com.pwebi.ecommerce.models.dtos;

import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteOutputDTO {

    private UsuarioOutputDTO usuario;
    private String endereco;
    private Long id;


}
