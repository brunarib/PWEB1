package br.com.pwebi.ecommerce.models.entities;


import lombok.*;

import javax.persistence.*;

@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "produto_compra")
@Entity
public class ProdutoCompraEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	)
    @Column(name = "id", unique = true,nullable = false)
    protected  Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "produto_id", nullable = false)
    protected ProdutoEntity produto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "compra_id", nullable = false)
    protected CompraEntity compra;

    @Column(name = "quantidade_produto", nullable = false)
    protected  Integer quantidadeProduto;

    @Column(name = "valor_total_produto", nullable = false)
    protected  float valorTotalProduto;



}
