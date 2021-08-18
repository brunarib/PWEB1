package br.com.pwebi.ecommerce.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioInputDTO {

    private String nome;
    private String login;
    private String senha;
    private String email;

}
