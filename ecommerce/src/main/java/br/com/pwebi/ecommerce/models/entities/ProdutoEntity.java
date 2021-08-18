package br.com.pwebi.ecommerce.models.entities;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import lombok.*;

import javax.persistence.*;

import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
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



    @ManyToMany(cascade ={CascadeType.DETACH,
            CascadeType.REFRESH})

    @JoinTable(name="produto_categoria", joinColumns=
            {@JoinColumn(name="produto_id")}, inverseJoinColumns=
            {@JoinColumn(name="categoria_id")})
    private List<CategoriaEntity> categorias;







}
