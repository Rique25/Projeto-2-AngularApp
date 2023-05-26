package io.github.Rique25.Vendas.services;

import io.github.Rique25.Vendas.dtos.AuthenticationDTO;
import io.github.Rique25.Vendas.dtos.TokenDTO;
import io.github.Rique25.Vendas.jwt.JwtTokenProvider;
import io.github.Rique25.Vendas.models.Usuario;
import io.github.Rique25.Vendas.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = repository.getByUsuario(username).get();
        if (user != null) {
            return user;
        }
        throw new UsernameNotFoundException("Usuário não encontrado!");
    }

}
