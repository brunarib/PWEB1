package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ClienteOutputDTO;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;

import java.util.List;

public interface IUsuarioService {

    ClienteOutputDTO create(ClienteInputDTO clienteInputDTO);

    List<UsuarioEntity> listAll();

    ClienteOutputDTO findByToken(String token);
}
