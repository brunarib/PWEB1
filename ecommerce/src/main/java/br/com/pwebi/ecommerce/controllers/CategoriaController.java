package br.com.pwebi.ecommerce.controllers;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.CategoriaInputDTO;
import br.com.pwebi.ecommerce.services.interfaces.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;


    @PostMapping("/categoriaCadastro")
    public ResponseEntity<CategoriaDTO> create(@RequestBody @Valid CategoriaInputDTO inputDTO){
        return new ResponseEntity<>(categoriaService.create(inputDTO.getDescricao()),
                HttpStatus.OK);
    }


}
