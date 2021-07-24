package br.com.pwebi.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categoria")
public class CategoriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "categoria_id", unique = true,nullable = false)
    protected  Long id;


    @Column(name = "descricao", unique = true, nullable = false)
    protected  String descricao;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "categoria")
    private Set<ProdutoCategoriaEntity> produtoCategoriaEntities;
}
