package br.com.pwebi.ecommerce.models.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuarios")
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	)
    @Column(name = "usuario_id", unique = true,nullable = false)
    protected  Long id;

    @Column(name = "nome", nullable = false)
    protected String nome;

    @Column(name = "login", nullable = false)
    protected String login;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "senha", nullable = false)
    protected String senha;

    @Column(name = "email", nullable = false)
    protected String email;

    @Column(name = "is_adm", nullable = false, columnDefinition = "false")
    protected boolean isAdm;



}
