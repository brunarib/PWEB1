package br.com.pwebi.ecommerce.controllers;


import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.CategoriaInputDTO;
import br.com.pwebi.ecommerce.models.dtos.CompraInputDTO;
import br.com.pwebi.ecommerce.models.dtos.CompraOutputDTO;
import br.com.pwebi.ecommerce.services.interfaces.ICategoriaService;
import br.com.pwebi.ecommerce.services.interfaces.ICompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController

@RequestMapping("/compra")
public class CompraController {

    @Autowired
    private ICompraService compraService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/finalizarCompra")
    public ResponseEntity<CompraOutputDTO> comprar(@RequestBody @Valid CompraInputDTO inputDTO){
       return new ResponseEntity<>(compraService.finalizarCompra(inputDTO), HttpStatus.OK) ;

    }
}
