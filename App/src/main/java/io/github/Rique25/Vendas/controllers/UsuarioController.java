package io.github.Rique25.Vendas.controllers;

import io.github.Rique25.Vendas.dtos.AuthenticationDTO;
import io.github.Rique25.Vendas.dtos.TokenDTO;
import io.github.Rique25.Vendas.exceptions.BadRequestException;
import io.github.Rique25.Vendas.jwt.JwtTokenProvider;
import io.github.Rique25.Vendas.models.Usuario;
import io.github.Rique25.Vendas.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signin")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario create(@Valid @RequestBody Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }


    @PostMapping("/login")
    public TokenDTO login(@RequestBody AuthenticationDTO user) {
        Usuario usuario = usuarioRepository.getByUsuario(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usu?rio n?o encontrado!"));

        if (!passwordEncoder.matches(user.getPassword(), usuario.getPassword())) {
            throw new BadCredentialsException("Senha incorreta!");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        return  jwtTokenProvider.createAccessToken(usuario, Arrays.asList(usuario.getPerfil().getPerfil()));
    }

    @GetMapping("/{id}")
    public Usuario getById(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);
        return usuarioRepository.findById(uuid).get();
    }

    @PutMapping("/{id}")
    public Usuario update(@RequestBody Usuario usuario, @PathVariable String id) {
        return usuarioRepository.findById(UUID.fromString(id))
                .map((user) -> {
                    String senha = passwordEncoder.encode(usuario.getSenha());
                    usuario.setSenha(senha);
                    usuario.setId(user.getId());
                    usuarioRepository.save(usuario);
                    return usuario;
                }).orElseThrow(() -> new BadRequestException("Usu?rio n?o encontrado"));
    }
}
