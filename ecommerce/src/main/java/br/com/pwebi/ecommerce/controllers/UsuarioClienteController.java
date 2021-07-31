package br.com.pwebi.ecommerce.controllers;

import br.com.pwebi.ecommerce.exception.ValidationException;
import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;
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

  /*  @GetMapping("/validarSenha")
    public ResponseEntity<Boolean> validarSenha(@RequestParam String login,
                                                @RequestParam String senha) {

        Optional<UsuarioEntity> optUsuario = repository.findByLogin(login);
        if (!optUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        UsuarioEntity usuario = optUsuario.get();
        boolean valid = encoder.matches(senha, usuario.getSenha());

        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(valid);
    }*/

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
}
