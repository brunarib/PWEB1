package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.entities.CategoriaEntity;
import br.com.pwebi.ecommerce.models.repositories.CategoriaRepository;
import br.com.pwebi.ecommerce.services.interfaces.ICategoriaService;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements ICategoriaService {

    private final CategoriaRepository repository;

    public CategoriaServiceImpl(CategoriaRepository repository) {
        this.repository = repository;
    }

    @Override
    public CategoriaDTO create(String descricao) {
        CategoriaEntity categoriaEntity = new CategoriaEntity();
        categoriaEntity.setDescricao(descricao);
        CategoriaEntity   categoriaSalvo= this.repository.save(categoriaEntity);

        return new CategoriaDTO()
                .builder()
                .categoriaId(categoriaSalvo.getId())
                .descricao(categoriaSalvo.getDescricao())
                .build();
    }
}
