package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoInputUpdateDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoOutputDTO;
import br.com.pwebi.ecommerce.models.entities.CategoriaEntity;


import br.com.pwebi.ecommerce.models.entities.ProdutoEntity;


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


    public ProdutoServiceImpl(ProdutoRepository repository){
        this.repository = repository;



    }

    @Override
    public ProdutoOutputDTO create(ProdutoInputDTO inputDTO) {

        //seta categorias do produto
        List<CategoriaEntity> categorias = parseCategoriaEntityList(inputDTO.getCategorias());

        //seta e salva o produto
        ProdutoEntity produtoEntity = new ProdutoEntity();
        produtoEntity.setDescricao(inputDTO.getDescricaoProduto());
        produtoEntity.setPreco(inputDTO.getPreco());
        produtoEntity.setQuantidadeEstoque(inputDTO.getQuantidadeEstoque());
        produtoEntity.setCategorias(categorias);
        ProdutoEntity produtoSalvo = this.repository.save(produtoEntity);

        List<CategoriaDTO> categoriaDTO =parseCategoriaDTOList(produtoSalvo.getCategorias());

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
                    parseCategoriaDTOList(e.getCategorias());

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

    private List<CategoriaDTO> parseCategoriaDTOList(List<CategoriaEntity> categoriaEntities) {
        return   categoriaEntities.stream().map(r -> CategoriaDTO.builder()
                .categoriaId(r.getId())
                .descricao(r.getDescricao())
                .build()
        ).collect(Collectors.toList());
    }

    private List<CategoriaEntity> parseCategoriaEntityList(List<CategoriaDTO> categoriaEntities) {
        return   categoriaEntities.stream().map(r -> CategoriaEntity.builder()
                .id(r.getCategoriaId())
                .descricao(r.getDescricao())
                .build()
        ).collect(Collectors.toList());
    }


    @Override
    public ProdutoOutputDTO update(ProdutoInputUpdateDTO inputDTO) {

        ProdutoEntity produtoEntity =
                repository.getOne(inputDTO.getProdutoId());

        if(produtoEntity!=null) {
            //seta categoria do produto

            List<CategoriaEntity> categorias =  parseCategoriaEntityList(inputDTO.getCategorias());

            //seta e salva o produto
            ProdutoEntity produto = produtoEntity;
            produto.setDescricao(inputDTO.getDescricaoProduto());
            produto.setPreco(inputDTO.getPreco());
            produto.setQuantidadeEstoque(inputDTO.getQuantidadeEstoque());
            produto.setCategorias(categorias);
            ProdutoEntity produtoSalvo = this.repository.save(produto);

            List<CategoriaDTO> categoriaDTO = parseCategoriaDTOList(produtoSalvo.getCategorias());

            return new ProdutoOutputDTO().
                    builder()
                    .produtoId(produtoSalvo.getId())
                    .descricaoProduto(produtoSalvo.getDescricao())
                    .categoria(categoriaDTO)
                    .preco(produtoSalvo.getPreco())
                    .quantidadeEstoque(produtoSalvo.getQuantidadeEstoque())
                    .build();
        }

        return new ProdutoOutputDTO().
                builder()
                .produtoId(produtoEntity.getId())
                .descricaoProduto(produtoEntity.getDescricao())
                .categoria(parseCategoriaDTOList(produtoEntity.getCategorias()))
                .preco(produtoEntity.getPreco())
                .quantidadeEstoque(produtoEntity.getQuantidadeEstoque())
                .build();
    }


    @Override
    public void delete(long produtoId) {
        repository.deleteById(produtoId);

    }
}
