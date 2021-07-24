package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;

public interface IUsuarioService {

    void create(ClienteInputDTO clienteInputDTO);
}
