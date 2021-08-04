package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoInputDTO;
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

        //seta categoria do produto
        List<CategoriaEntity > categorias = new ArrayList<>();
        CategoriaEntity categoriaEntity = new CategoriaEntity();
        categoriaEntity.setId(inputDTO.getCategoria().getCategoriaId());
        categoriaEntity.setDescricao(inputDTO.getCategoria().getDescricao());
        categorias.add(categoriaEntity);

        //seta e salva o produto
        ProdutoEntity produtoEntity = new ProdutoEntity();
        produtoEntity.setDescricao(inputDTO.getDescricaoProduto());
        produtoEntity.setPreco(inputDTO.getPreco());
        produtoEntity.setQuantidadeEstoque(inputDTO.getQuantidadeEstoque());
        produtoEntity.setCategorias(categorias);
        ProdutoEntity produtoSalvo = this.repository.save(produtoEntity);

        //seta e salva o relacionamento produto categoria
//        ProdutoCategoriaEntity produtoCategoriaEntity= new ProdutoCategoriaEntity();
//        produtoCategoriaEntity.setProduto(produtoSalvo);
//        produtoCategoriaEntity.setCategoria(categoriaEntity);
//        produtoCategoriaRepository.save(produtoCategoriaEntity);

        ProdutoEntity produtoCategoria = this.repository.getOne(produtoSalvo.getId());

//        System.out.println("--------------------------");
//
//        System.out.println(produtoCategoria==null);
//        System.out.println(produtoCategoria.getProdutoCategoriaEntities()==null);
       List<CategoriaDTO> categoriaDTO =parseCategoriaList(produtoSalvo.getCategorias());

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
                    parseCategoriaList(e.getCategorias());


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


    private List<CategoriaDTO> parseCategoriaList(List<CategoriaEntity> categoriaEntities) {
        return   categoriaEntities.stream().map(r -> CategoriaDTO.builder()
                .categoriaId(r.getId())
                .descricao(r.getDescricao())
                .build()
        ).collect(Collectors.toList());
    }
}
