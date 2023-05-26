package io.github.Rique25.Vendas.controllers;

import io.github.Rique25.Vendas.dtos.ServicoDTO;
import io.github.Rique25.Vendas.exceptions.BadRequestException;
import io.github.Rique25.Vendas.models.Servico;
import io.github.Rique25.Vendas.services.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/servico")
public class ServicoController {

    @Autowired
    private ServicoService service;

    @GetMapping("/{criadoPor}")
    public Page<Servico> getServicos(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                     @RequestParam(name = "size", defaultValue = "10") Integer size,
                                     @RequestParam(name = "direction", defaultValue = "asc") String direction,
                                     @PathVariable String criadoPor)
    {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "servico"));
        return this.service.getServicos(pageable, criadoPor);
    }

    @GetMapping("/{id}/{criadoPor}")
    public Servico getServico(@PathVariable UUID id, @PathVariable String criadoPor) {
        if (id != null) {
            return this.service.getServico(id, criadoPor);
        }
        throw new BadRequestException("É necessário fornecer um id para encontrar um serviço.");
    }

    @PostMapping
    public Servico create(@RequestBody ServicoDTO servico) {
        return this.service.create(servico);
    }

    @PutMapping("/{id}")
    public Servico update(@RequestBody ServicoDTO servico, @PathVariable UUID id) {
        return this.service.update(servico, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        this.service.delete(id);
    }
}
