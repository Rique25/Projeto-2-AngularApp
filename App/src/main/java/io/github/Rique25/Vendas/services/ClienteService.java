package io.github.Rique25.Vendas.services;

import io.github.Rique25.Vendas.dtos.ClienteDTO;
import io.github.Rique25.Vendas.exceptions.BadRequestException;
import io.github.Rique25.Vendas.models.Cliente;
import io.github.Rique25.Vendas.models.Usuario;
import io.github.Rique25.Vendas.repositories.ClienteRepository;
import io.github.Rique25.Vendas.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.UUID;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Cliente create(ClienteDTO clienteDTO) {
        if (repository.findByCpf(clienteDTO.getCpf()) != null) {
            throw new BadRequestException("Já existe um cliente com esse cpf cadastrado");
        }
        Cliente cliente = setCliente(clienteDTO);
        return repository.save(cliente);
    }

    private Cliente setCliente(ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente();
        cliente.setNome(clienteDTO.getNome());
        cliente.setSexo(clienteDTO.getSexo());
        cliente.setCpf(clienteDTO.getCpf());
        cliente.setCriadoPor(getUsuario(clienteDTO.getCriadoPor()));
        return cliente;
    }

    private Usuario getUsuario(String id) {
        return usuarioRepository.findById(UUID.fromString(id)).get();
    }

    @Transactional
    public Cliente update(Cliente cliente, UUID id) {
        return this.repository.findById(id).map( c -> {
            cliente.setId(c.getId());
            cliente.setDataCadastro(c.getDataCadastro());
            return this.repository.save(cliente);
        }).orElseThrow(() -> new BadRequestException("Cliente não encontrado!"));
    }

    public Page<Cliente> getClientes(Pageable pageable, String criadoPor) {
        Usuario usuario = getUsuario(criadoPor);
        return this.repository.findAll(pageable, usuario);
    }

    public Cliente getCliente(UUID id, String criadoPor) {
        Usuario usuario = getUsuario(criadoPor);
        return this.repository.findById(id, usuario);
    }

    @Transactional
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
