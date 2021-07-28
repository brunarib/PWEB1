package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;

import java.util.List;

public interface ICategoriaService {

    CategoriaDTO create(String descricao);

    List<CategoriaDTO> listAll();
}
