package io.github.Rique25.Vendas.repositories;

import io.github.Rique25.Vendas.models.Cliente;
import io.github.Rique25.Vendas.models.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ClienteRepository extends JpaRepository<Cliente, UUID> {

    Cliente findByCpf(String cpf);

    @Query("SELECT c FROM Cliente c WHERE c.criadoPor = :criadoPor")
    Page<Cliente> findAll(Pageable pageable, Usuario criadoPor);

    @Query("SELECT c FROM Cliente c WHERE c.id = :id AND c.criadoPor = :criadoPor")
    Cliente findById(UUID id, Usuario criadoPor);
}
