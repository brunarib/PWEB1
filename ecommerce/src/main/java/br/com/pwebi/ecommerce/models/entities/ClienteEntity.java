package br.com.pwebi.ecommerce.models.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "cliente")
public class ClienteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
            @Column(name = "cliente_id", unique = true,nullable = false)
    protected  Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "usuario_id")
    protected UsuarioEntity usuario;

    @Column(name = "endereco", nullable = false)
    protected String endereco;




}
