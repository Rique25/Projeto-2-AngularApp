package io.github.Rique25.Vendas.repositories;

import io.github.Rique25.Vendas.models.Cliente;
import io.github.Rique25.Vendas.models.Servico;
import io.github.Rique25.Vendas.models.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ServicoRepository extends JpaRepository<Servico, UUID> {

    @Query("SELECT s FROM Servico s WHERE s.criadoPor = :criadoPor")
    Page<Servico> findAll(Pageable pageable, Usuario criadoPor);

    @Query("SELECT s FROM Servico s WHERE s.id = :id AND s.criadoPor = :criadoPor")
    Servico findById(UUID id, Usuario criadoPor);
}
