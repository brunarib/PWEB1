package br.com.pwebi.ecommerce.controllers;


import br.com.pwebi.ecommerce.models.assemblers.ComprasAssembler;
import br.com.pwebi.ecommerce.models.dtos.ComprasRelatorioFiltrosDTO;
import br.com.pwebi.ecommerce.models.entities.ComprasViewEntity;
import br.com.pwebi.ecommerce.services.interfaces.IComprasService;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController

@RequestMapping("/compras")
public class ComprasRelatorioController {

    private final ComprasAssembler assembler;
    private final IComprasService service;

    public ComprasRelatorioController(ComprasAssembler assembler, IComprasService service) {
        this.assembler = assembler;
        this.service = service;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<ComprasViewEntity>> relatorio(
            @ModelAttribute ComprasRelatorioFiltrosDTO filtro
    ) {
        Specification<ComprasViewEntity> specification =
                assembler.parseSpecificationFilter(
                        filtro
                );
        List<ComprasViewEntity> entities = service.findAll(specification);


        return new ResponseEntity<>(entities, HttpStatus.OK);
    }
}
