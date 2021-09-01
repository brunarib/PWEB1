package br.com.pwebi.ecommerce.models.entities;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "compra")
@Entity
public class CompraEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	)
    @Column(name = "compra_id", unique = true,nullable = false)
    protected  Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id",nullable = false)
    protected  ClienteEntity cliente;

    @Column(name = "compra_efetuada", nullable = false)
    protected LocalDateTime dataCompra;

    @Column(name = "valor_total", nullable = false)
    protected float valorTotal;

    @Column(name = "status", nullable = false)
    protected String status;




}
