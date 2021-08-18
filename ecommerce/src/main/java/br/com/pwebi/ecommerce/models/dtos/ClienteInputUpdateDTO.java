package br.com.pwebi.ecommerce.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteInputUpdateDTO {

    private Long id;
    private UsuarioInputDTO usuario;
    private String endereco;

}
