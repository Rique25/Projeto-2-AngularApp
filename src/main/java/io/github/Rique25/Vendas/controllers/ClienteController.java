package io.github.Rique25.Vendas.controllers;

import io.github.Rique25.Vendas.dtos.ClienteDTO;
import io.github.Rique25.Vendas.exceptions.BadRequestException;
import io.github.Rique25.Vendas.models.Cliente;
import io.github.Rique25.Vendas.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping("/{criadoPor}")
    public Page<Cliente> getClientes(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                      @RequestParam(name = "size", defaultValue = "10") Integer size,
                                      @RequestParam(name = "direction", defaultValue = "asc") String direction,
                                     @PathVariable String criadoPor)
    {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "nome"));
        return this.service.getClientes(pageable, criadoPor);
    }

    @GetMapping("/{id}/{criadoPor}")
    public Cliente getCliente(@PathVariable String id, @PathVariable String criadoPor) {
        if (id != null) {
            UUID clienteId = UUID.fromString(id);
            return this.service.getCliente(clienteId, criadoPor);
        }
        throw new BadRequestException("É necessário fornecer um id para encontrar um cliente.");
    }

    @PostMapping
    public Cliente create(@RequestBody ClienteDTO cliente) {
        return this.service.create(cliente);
    }

    @PutMapping("/{id}")
    public Cliente update(@Valid @RequestBody Cliente cliente, @PathVariable UUID id) {
        return this.service.update(cliente, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        System.out.println("deleted");
        this.service.delete(id);
    }
}
