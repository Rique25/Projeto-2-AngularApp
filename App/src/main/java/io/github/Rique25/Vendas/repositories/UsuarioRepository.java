package io.github.Rique25.Vendas.repositories;

import io.github.Rique25.Vendas.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    @Query("SELECT u FROM Usuario u WHERE u.usuario = :usuario")
    Optional<Usuario> getByUsuario(String usuario);
}
