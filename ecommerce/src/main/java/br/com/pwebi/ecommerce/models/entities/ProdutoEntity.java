package br.com.pwebi.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "produto")
public class ProdutoEntity   {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	)
    @Column(name = "produto_id", unique = true,nullable = false)
    protected  Long id;


    @Column(name = "descricao", nullable = false)
    protected  String descricao;

    @Column(name = "preco", nullable = false)
    protected  float preco;

    @Column(name = "quantidade_estoque", nullable = false)
    protected  int quantidadeEstoque;

    //image bytes can have large lengths so we specify a value
    //which is more than the default length for picByte column
    @Column(name = "foto",length = 429496729)
    private byte[] foto;

    /*@OneToMany(fetch = FetchType.LAZY, mappedBy = "produto")
    private Set<ProdutoCategoriaEntity> produtoCategoriaEntities;
*/

    @ManyToMany
    @JoinTable(name="produto_categoria", joinColumns=
            {@JoinColumn(name="produto_id")}, inverseJoinColumns=
            {@JoinColumn(name="categoria_id")})
    private List<CategoriaEntity> categorias;







}
