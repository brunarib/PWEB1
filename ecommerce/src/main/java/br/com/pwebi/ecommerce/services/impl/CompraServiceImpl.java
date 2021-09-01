package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.CompraInputDTO;
import br.com.pwebi.ecommerce.models.dtos.CompraOutputDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutosCarrinhoDTO;
import br.com.pwebi.ecommerce.models.entities.*;
import br.com.pwebi.ecommerce.models.repositories.CompraRepository;
import br.com.pwebi.ecommerce.models.repositories.ProdutoCompraRepository;
import br.com.pwebi.ecommerce.models.repositories.ProdutoRepository;
import br.com.pwebi.ecommerce.services.interfaces.ICompraService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompraServiceImpl implements ICompraService {

    private final CompraRepository compraRepository;
    private final ProdutoCompraRepository produtoCompraRepository;
    private final ProdutoRepository produtoRepository;

    public CompraServiceImpl(CompraRepository compraRepository, ProdutoCompraRepository produtoCompraRepository, ProdutoRepository produtoRepository) {
        this.compraRepository = compraRepository;
        this.produtoCompraRepository = produtoCompraRepository;
        this.produtoRepository = produtoRepository;
    }

    @Override
    public CompraOutputDTO finalizarCompra(CompraInputDTO dto){

        ClienteEntity clienteEntity = new ClienteEntity();
        clienteEntity.setId(dto.getClienteId());

        CompraEntity entity =  new CompraEntity();
        entity.setDataCompra(LocalDateTime.now());

        entity.setCliente(clienteEntity);
        entity.setStatus("COMPRA REALIZADA");
        entity.setValorTotal(dto.getValorTotalCompra());
        CompraEntity pedido = compraRepository.save(entity);

        ProdutoCompraEntity produtoCompraEntity = new ProdutoCompraEntity();

        List<ProdutosCarrinhoDTO> carrinho = dto.getListaProdutos();


        List<ProdutoCompraEntity> listaProdutos =
                carrinho.stream().map(r -> ProdutoCompraEntity.builder()
                .compra(pedido)
                .produto(builderProduto(r.getProdutoId()))
                .quantidadeProduto(r.getQuantidade())
                .valorTotalProduto(r.getValorTotalProdutos())
                .build()
        ).collect(Collectors.toList());

        List<ProdutoCompraEntity> compraEfetuada = new ArrayList<>();


        for (ProdutoCompraEntity e : listaProdutos){
            if(temEstoque(e.getProduto(), e.getQuantidadeProduto())){
                produtoCompraEntity.setCompra(e.getCompra());
                produtoCompraEntity.setProduto(e.getProduto());
                produtoCompraEntity.setQuantidadeProduto(e.getQuantidadeProduto());
                produtoCompraEntity.setValorTotalProduto(e.getValorTotalProduto());
                compraEfetuada.add( produtoCompraRepository.save(produtoCompraEntity));
            }

        }

        if(compraEfetuada.size() == listaProdutos.size()){


            for(ProdutoCompraEntity e :compraEfetuada ){
                ProdutoEntity produtoEntity = produtoRepository.getOne(e.getProduto().getId());
                int novoEstoque =
                        (produtoEntity.getQuantidadeEstoque()- e.getQuantidadeProduto());
                produtoEntity.setQuantidadeEstoque(novoEstoque);
                produtoRepository.saveAndFlush(produtoEntity);
            }

            return CompraOutputDTO.builder()
                    .compraId(pedido.getId())
                    .clienteId(dto.getClienteId())
                    .listaProdutos(carrinho)
                    .valorTotalCompra(dto.getValorTotalCompra())
                    .status("COMPRA REALIZADA!")
                    .build();
        }else{

            for (ProdutoCompraEntity e : listaProdutos){

                    produtoCompraEntity.setCompra(e.getCompra());
                    produtoCompraEntity.setProduto(e.getProduto());
                    produtoCompraEntity.setQuantidadeProduto(e.getQuantidadeProduto());
                    produtoCompraEntity.setValorTotalProduto(e.getValorTotalProduto());
                    produtoCompraRepository.save(produtoCompraEntity);

            }

            pedido.setStatus("COMPRA CANCELADA POR FALTA DE ESTOQUE!");
            compraRepository.saveAndFlush(pedido);


            return CompraOutputDTO.builder()
                    .compraId(pedido.getId())
                    .clienteId(dto.getClienteId())
                    .listaProdutos(carrinho)
                    .valorTotalCompra(pedido.getValorTotal())
                    .status("COMPRA CANCELADA POR FALTA DE ESTOQUE!")
                    .build();
        }

    }

    private Boolean temEstoque(ProdutoEntity produto, int quantidade){
        boolean estoque = false;

       ProdutoEntity entity = produtoRepository.getOne(produto.getId());

       if(entity.getQuantidadeEstoque() >= quantidade){
            estoque= true;
       }
        return estoque;
    }


    private ProdutoEntity builderProduto(Long produtoId){
        ProdutoEntity entity = produtoRepository.customFindById(produtoId);
        return entity;
    }
}
