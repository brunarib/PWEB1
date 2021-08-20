package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.exception.ValidationException;
import br.com.pwebi.ecommerce.models.dtos.ClienteInputDTO;
import br.com.pwebi.ecommerce.models.dtos.ClienteInputUpdateDTO;
import br.com.pwebi.ecommerce.models.dtos.ClienteOutputDTO;
import br.com.pwebi.ecommerce.models.dtos.UsuarioOutputDTO;
import br.com.pwebi.ecommerce.models.entities.ClienteEntity;
import br.com.pwebi.ecommerce.models.entities.UsuarioEntity;
import br.com.pwebi.ecommerce.models.repositories.ClienteRepository;
import br.com.pwebi.ecommerce.models.repositories.UsuarioRepository;
import br.com.pwebi.ecommerce.services.interfaces.IUsuarioService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.apache.commons.codec.binary.Base64;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
public class UsuarioServiceImpl implements IUsuarioService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    public static final String ATRIBUTO_PREFIXO ="Bearer ";

    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(ClienteRepository clienteRepository, UsuarioRepository usuarioRepository) {
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public ClienteOutputDTO create(ClienteInputDTO clienteInputDTO) throws ValidationException {

        Optional<UsuarioEntity> usuarioEntity =
                this.usuarioRepository.findByLogin(clienteInputDTO.getUsuario().getLogin());
        if(usuarioEntity.isPresent()){
            throw new ValidationException("Login já existe!");
        }

        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setAdm(false);
        usuario.setEmail(clienteInputDTO.getUsuario().getEmail());
        usuario.setLogin(clienteInputDTO.getUsuario().getLogin());
        usuario.setNome(clienteInputDTO.getUsuario().getNome());
        usuario.setSenha(passwordEncoder.encode(clienteInputDTO.getUsuario().getSenha()));
        UsuarioEntity usuarioSalvo =  this.usuarioRepository.save(usuario);

        System.out.println("salvou usuario");
        ClienteEntity cliente = new ClienteEntity();
        cliente.setUsuario(usuarioSalvo);
        cliente.setEndereco(clienteInputDTO.getEndereco());

        ClienteEntity clienteSalvo =  this.clienteRepository.save(cliente);

        return new ClienteOutputDTO().builder()
                .id(clienteSalvo.getId())
                .usuario( new UsuarioOutputDTO().builder()
                        .id(usuarioSalvo.getId())
                        .email(usuarioSalvo.getEmail())
                        .isAdm(usuarioSalvo.isAdm())
                        .login(usuarioSalvo.getLogin())
                        .nome(usuarioSalvo.getNome())
                        .build())
                .endereco(clienteSalvo.getEndereco()).build();


    }

    @Override
    public List<UsuarioEntity> listAll() {
        return usuarioRepository.findAll();
    }



    @Override
    public ClienteOutputDTO findByToken(String token)  throws ValidationException {

        String username;
        String jwt;

        if(token.startsWith(ATRIBUTO_PREFIXO)){
           jwt =  token.replace("Bearer ", "");
        }else{
            jwt = token;
        }

        String[] split_string = jwt.split("\\.");
        String base64EncodedBody = split_string[1];

        Base64 base64Url = new Base64(true);
        String body = new String(base64Url.decode(base64EncodedBody));

        Map<String, Object> response = null;
        try {
            response = new ObjectMapper().readValue(body, HashMap.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        username = response.get("sub").toString();

        if (username != null && !username.trim().equals("")) {

            ClienteEntity clienteEntity = getUserIdByUsername(username);
          return new ClienteOutputDTO().builder()
                  .id(clienteEntity.getId())
                  .usuario( new UsuarioOutputDTO().builder()
                          .id(clienteEntity.getUsuario().getId())
                          .email(clienteEntity.getUsuario().getEmail())
                          .isAdm(clienteEntity.getUsuario().isAdm())
                          .login(clienteEntity.getUsuario().getLogin())
                          .nome(clienteEntity.getUsuario().getNome())
                          .build())
                  .endereco(clienteEntity.getEndereco()).build();
        }

        throw new ValidationException("Login já existe!");


    }


    private ClienteEntity getUserIdByUsername(String user) {
            UsuarioEntity userEntity = usuarioRepository.findEntityByLogin(user);

            ClienteEntity cliente = clienteRepository.findByUsuario(userEntity);

            return   cliente;
        }


    @Override
    public void delete(long clienteId) {
        clienteRepository.deleteById(clienteId);

    }

    private UsuarioEntity getUserEntity(long userId) throws EntityNotFoundException {
        return usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
    }


    @Override
    public ClienteOutputDTO update(ClienteInputUpdateDTO clienteInputDTO) throws ValidationException {

       ClienteEntity clienteEntity =
               this.clienteRepository.getOne(clienteInputDTO.getId());
       if(clienteEntity !=null) {

           UsuarioEntity usuario = clienteEntity.getUsuario();
           if (!usuario.isAdm()){
               usuario.setAdm(false);
           }
           usuario.setEmail(clienteInputDTO.getUsuario().getEmail());
           usuario.setNome(clienteInputDTO.getUsuario().getNome());
           UsuarioEntity usuarioSalvo = this.usuarioRepository.save(usuario);

           System.out.println("salvou usuario");
           ClienteEntity cliente = clienteEntity;
           cliente.setUsuario(usuarioSalvo);
           cliente.setEndereco(clienteInputDTO.getEndereco());

           ClienteEntity clienteSalvo = this.clienteRepository.save(cliente);

           return new ClienteOutputDTO().builder()
                   .id(clienteSalvo.getId())
                   .usuario(new UsuarioOutputDTO().builder()
                           .id(usuarioSalvo.getId())
                           .email(usuarioSalvo.getEmail())
                           .isAdm(usuarioSalvo.isAdm())
                           .login(usuarioSalvo.getLogin())
                           .nome(usuarioSalvo.getNome())
                           .build())
                   .endereco(clienteSalvo.getEndereco()).build();
       }

       return new ClienteOutputDTO().builder()
                .id(clienteEntity.getId())
                .usuario(new UsuarioOutputDTO().builder()
                        .id(clienteEntity.getUsuario().getId())
                        .email(clienteEntity.getUsuario().getEmail())
                        .isAdm(clienteEntity.getUsuario().isAdm())
                        .login(clienteEntity.getUsuario().getLogin())
                        .nome(clienteEntity.getUsuario().getNome())
                        .build())
                .endereco(clienteEntity.getEndereco()).build();

    }


}
