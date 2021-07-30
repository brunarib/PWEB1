package br.com.pwebi.ecommerce.models.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsuarioOutputDTO {

    private Long id;
    private String nome;
    private String login;
    private String email;
    private boolean isAdm;
}
