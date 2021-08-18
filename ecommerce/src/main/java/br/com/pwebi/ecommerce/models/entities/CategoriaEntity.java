package br.com.pwebi.ecommerce.models.entities;

import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "categoria")
public class CategoriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	)
    @Column(name = "categoria_id", unique = true,nullable = false)
    protected  Long id;


    @Column(name = "descricao", unique = true, nullable = false)
    protected  String descricao;

}
