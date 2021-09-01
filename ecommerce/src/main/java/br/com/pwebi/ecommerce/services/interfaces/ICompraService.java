package br.com.pwebi.ecommerce.services.interfaces;

import br.com.pwebi.ecommerce.models.dtos.CompraInputDTO;
import br.com.pwebi.ecommerce.models.dtos.CompraOutputDTO;

public interface ICompraService {

    CompraOutputDTO finalizarCompra(CompraInputDTO dto);

}
