package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoOutputDTO;

import java.util.List;

public interface IProdutoService {

    ProdutoOutputDTO create(ProdutoInputDTO produtoInputDTO);

   List<ProdutoOutputDTO> listAll();
}
