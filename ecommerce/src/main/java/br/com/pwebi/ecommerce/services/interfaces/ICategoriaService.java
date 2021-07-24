package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;

public interface ICategoriaService {

    CategoriaDTO create(String descricao);
}
