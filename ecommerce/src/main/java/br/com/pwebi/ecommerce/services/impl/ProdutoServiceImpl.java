package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoOutputDTO;
import br.com.pwebi.ecommerce.models.entities.CategoriaEntity;

import br.com.pwebi.ecommerce.models.entities.ProdutoCategoriaEntity;
import br.com.pwebi.ecommerce.models.entities.ProdutoEntity;

import br.com.pwebi.ecommerce.models.repositories.ProdutoCategoriaRepository;
import br.com.pwebi.ecommerce.models.repositories.ProdutoRepository;
import br.com.pwebi.ecommerce.services.interfaces.IProdutoService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProdutoServiceImpl  implements IProdutoService {

    private final ProdutoRepository repository;
    private final ProdutoCategoriaRepository produtoCategoriaRepository;

    public ProdutoServiceImpl(ProdutoRepository repository, ProdutoCategoriaRepository produtoCategoriaRepository){
        this.repository = repository;
        this.produtoCategoriaRepository = produtoCategoriaRepository;


    }

    @Override
    public ProdutoOutputDTO create(ProdutoInputDTO inputDTO) {

        //seta categoria do produto
        CategoriaEntity categoriaEntity = new CategoriaEntity();
        categoriaEntity.setId(inputDTO.getCategoria().getCategoriaId());
        categoriaEntity.setDescricao(inputDTO.getCategoria().getDescricao());

        //seta e salva o produto
        ProdutoEntity produtoEntity = new ProdutoEntity();
        produtoEntity.setDescricao(inputDTO.getDescricaoProduto());
        produtoEntity.setPreco(inputDTO.getPreco());
        produtoEntity.setQuantidadeEstoque(inputDTO.getQuantidadeEstoque());
        ProdutoEntity produtoSalvo = this.repository.save(produtoEntity);

        //seta e salva o relacionamento produto categoria
        ProdutoCategoriaEntity produtoCategoriaEntity= new ProdutoCategoriaEntity();
        produtoCategoriaEntity.setProduto(produtoSalvo);
        produtoCategoriaEntity.setCategoria(categoriaEntity);
        produtoCategoriaRepository.save(produtoCategoriaEntity);

        ProdutoEntity produtoCategoria =
                this.repository.getOne(produtoSalvo.getId());

        List<CategoriaDTO> categoriaDTO =
                parseCategoriaList(produtoCategoria.getProdutoCategoriaEntities());

        return new ProdutoOutputDTO().
                builder()
                .produtoId(produtoSalvo.getId())
                .descricaoProduto(produtoSalvo.getDescricao())
                .categoria(categoriaDTO)
                .preco(produtoSalvo.getPreco())
                .quantidadeEstoque(produtoSalvo.getQuantidadeEstoque())
                .build();



    }

    @Override
    public List<ProdutoOutputDTO> listAll() {
        List<ProdutoEntity>  entityList = this.repository.findAll();


        List<ProdutoOutputDTO> outputDTOList = new ArrayList<>();

        for (ProdutoEntity e: entityList ){

            List<CategoriaDTO> categoriaDTO =
                    parseCategoriaList(e.getProdutoCategoriaEntities());


            outputDTOList.add(new ProdutoOutputDTO().
                    builder()
                    .produtoId(e.getId())
                    .descricaoProduto(e.getDescricao())
                    .categoria(categoriaDTO)
                    .preco(e.getPreco())
                    .quantidadeEstoque(e.getQuantidadeEstoque())
                    .build());
        }
        return outputDTOList;
    }


    private List<CategoriaDTO> parseCategoriaList(Set<ProdutoCategoriaEntity> categoriaEntities) {
        return   categoriaEntities.stream().map(r -> CategoriaDTO.builder()
                .categoriaId(r.getCategoria().getId())
                .descricao(r.getCategoria().getDescricao())
                .build()
        ).collect(Collectors.toList());
    }
}
