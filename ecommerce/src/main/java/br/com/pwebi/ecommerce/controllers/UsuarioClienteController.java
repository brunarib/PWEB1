package br.com.pwebi.ecommerce.controllers;

import br.com.pwebi.ecommerce.exception.ValidationException;
import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ClienteInputUpdateDTO;
import br.com.pwebi.ecommerce.models.dtos.ClienteOutputDTO;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import br.com.pwebi.ecommerce.models.repositories.UsuarioRepository;
import br.com.pwebi.ecommerce.services.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class UsuarioClienteController {

    private final UsuarioRepository repository;
    private final PasswordEncoder encoder;
    int count = 0;

    @Autowired
    private IUsuarioService usuarioService;

    public UsuarioClienteController(UsuarioRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @PostMapping("/usuarioCadastro")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ClienteOutputDTO> create(@RequestBody @Valid ClienteInputDTO dto)throws ValidationException {
        ClienteOutputDTO clienteOutputDTO = usuarioService.create(dto);

        return new ResponseEntity(clienteOutputDTO,HttpStatus.CREATED);
    }

    @GetMapping("/listarTodos")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<UsuarioEntity>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listAll());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getCliente")
    public ResponseEntity<ClienteOutputDTO> getCliente(@RequestHeader (
            "Authorization") String token) throws ValidationException{
        return new ResponseEntity(usuarioService.findByToken(token), HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deletar")
    public ResponseEntity<Void> delete(@Valid @RequestParam("clienteId") long clienteId) {
        usuarioService.delete(clienteId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/editar")
    public ResponseEntity<ClienteOutputDTO> update(@Valid @RequestBody ClienteInputUpdateDTO dto) {
        ClienteOutputDTO clienteOutputDTO = usuarioService.update(dto);

        return new ResponseEntity<>(clienteOutputDTO,HttpStatus.OK);
    }
}
