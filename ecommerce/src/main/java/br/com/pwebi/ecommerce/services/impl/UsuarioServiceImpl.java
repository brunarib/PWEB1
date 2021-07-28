package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;
import br.com.pwebi.ecommerce.models.entities.ClienteEntity;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import br.com.pwebi.ecommerce.models.repositories.ClienteRepository;
import br.com.pwebi.ecommerce.models.repositories.UsuarioRepository;
import br.com.pwebi.ecommerce.services.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements IUsuarioService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(ClienteRepository clienteRepository, UsuarioRepository usuarioRepository) {
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void create(ClienteInputDTO clienteInputDTO) {

        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setAdm(false);
        usuario.setEmail(clienteInputDTO.getUsuario().getEmail());
        usuario.setLogin(clienteInputDTO.getUsuario().getLogin());
        usuario.setNome(clienteInputDTO.getUsuario().getNome());
        usuario.setSenha(passwordEncoder.encode(clienteInputDTO.getUsuario().getSenha()));
        UsuarioEntity usuarioSalvo =  this.usuarioRepository.save(usuario);

        ClienteEntity cliente = new ClienteEntity();
        cliente.setUsuario(usuarioSalvo);
        cliente.setEndereco(clienteInputDTO.getEndereco());
        this.clienteRepository.save(cliente);

    }

    @Override
    public List<UsuarioEntity> listAll() {
        return usuarioRepository.findAll();
    }
}
