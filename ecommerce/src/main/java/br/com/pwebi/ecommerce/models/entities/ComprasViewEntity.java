package br.com.pwebi.ecommerce.models.entities;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vw_compras")
@Entity
public class ComprasViewEntity {

    @Id
    @Column(name = "id")
    protected int id;

    @Column(name = "compra_id")
    private Long compraId;

    @Column(name = "cliente_id")
    private Long clienteId;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "nome")
    private String nomeUsuario;

    @Column(name = "produto_id")
    private Long produtoId;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "quantidade_produto")
    private Integer quantidade;

    @Column(name = "valor_total_produto")
    private float valorTotalProdutos;

    @Column(name = "valor_total")
    private float valorTotalCompra;

    @Column(name = "compra_efetuada")
    private LocalDateTime dataCompra;

    @Column(name = "status")
    private String status;



}
