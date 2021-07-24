package br.com.pwebi.ecommerce.controllers;

import br.com.pwebi.ecommerce.models.dtos.ProdutoInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ProdutoOutputDTO;
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
    public ResponseEntity<ProdutoOutputDTO> create(@RequestBody @Valid ProdutoInputDTO produtoInputDTO){

        return new ResponseEntity<>(
                produtoService.create(produtoInputDTO), HttpStatus.OK);

    }


    @GetMapping
    public ResponseEntity<List<ProdutoOutputDTO>>listAll()throws Exception {
        List<ProdutoOutputDTO>list = produtoService.listAll();
        return new ResponseEntity<>(list,
                HttpStatus.OK);
    }
}
