package br.com.pwebi.ecommerce.controllers;

import br.com.pwebi.ecommerce.models.dtos.CategoriaDTO;
import br.com.pwebi.ecommerce.models.dtos.CategoriaInputDTO;
import br.com.pwebi.ecommerce.services.interfaces.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/categoriaCadastro")
    public ResponseEntity<CategoriaDTO> create( @RequestBody @Valid CategoriaInputDTO inputDTO){
        return new ResponseEntity<>(categoriaService.create(inputDTO.getDescricao()),
                HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> listAll(){
        return new ResponseEntity<>(categoriaService.listAll(),
                HttpStatus.OK);
    }


}
