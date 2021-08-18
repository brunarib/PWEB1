package br.com.pwebi.ecommerce.controllers;

import br.com.pwebi.ecommerce.models.dtos.*;
import br.com.pwebi.ecommerce.models.entities.ProdutoEntity;
import br.com.pwebi.ecommerce.services.interfaces.IProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private IProdutoService produtoService;


    @PostMapping("/produtoCadastro")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ProdutoOutputDTO> create(@RequestBody @Valid ProdutoInputDTO produtoInputDTO){

        return new ResponseEntity<>(
                produtoService.create(produtoInputDTO), HttpStatus.OK);
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<ProdutoOutputDTO>>listAll()throws Exception {
        List<ProdutoOutputDTO>list = produtoService.listAll();
        return new ResponseEntity<>(list,
                HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deletar")
    public ResponseEntity<Void> delete(@Valid @RequestParam("produtoId") long produtoId) {
        produtoService.delete(produtoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/editar")
    public ResponseEntity<ProdutoOutputDTO> update(@Valid @RequestBody ProdutoInputUpdateDTO dto) {
        ProdutoOutputDTO produtoOutputDTO = produtoService.update(dto);

        return new ResponseEntity<>(produtoOutputDTO,HttpStatus.OK);
    }
}
