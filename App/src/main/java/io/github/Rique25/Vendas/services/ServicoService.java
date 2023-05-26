package io.github.Rique25.Vendas.services;

import io.github.Rique25.Vendas.dtos.ServicoDTO;
import io.github.Rique25.Vendas.exceptions.BadRequestException;
import io.github.Rique25.Vendas.models.Cliente;
import io.github.Rique25.Vendas.models.Servico;
import io.github.Rique25.Vendas.models.Usuario;
import io.github.Rique25.Vendas.repositories.ClienteRepository;
import io.github.Rique25.Vendas.repositories.ServicoRepository;
import io.github.Rique25.Vendas.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.transaction.Transactional;
import java.util.UUID;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository repository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Servico create(ServicoDTO servicoDTO) {
        Servico servico = setServico(new Servico(), servicoDTO);
        return repository.save(servico);
    }

    private Servico setServico(@RequestBody Servico servico, ServicoDTO servicoDTO) {
        servico.setServico(servicoDTO.getServico());
        servico.setValor(servicoDTO.getValor());
        servico.setDescricao(servicoDTO.getDescricao());
        Cliente cliente = getCliente(servicoDTO.getCliente());
        servico.setCliente(cliente);
        servico.setCriadoPor(getUsuario(servicoDTO.getCriadoPor()));
        return servico;
    }

    private Usuario getUsuario(String id) {
        return usuarioRepository.findById(UUID.fromString(id)).get();
    }

    private Cliente getCliente(String id) {
        return this.clienteRepository.findById(UUID.fromString(id)).get();
    }

    @Transactional
    public Servico update(ServicoDTO servico, UUID id) {
        return this.repository.findById(id).map( s -> {
            s.setServico(servico.getServico());
            s.setValor(servico.getValor());
            s.setDescricao(servico.getDescricao());
            if (!s.getCliente().getId().equals(UUID.fromString(servico.getCliente()))) {
                Cliente cliente = getCliente(servico.getCliente());
                s.setCliente(cliente);
            }
            return repository.save(s);
        }).orElseThrow(() -> new BadRequestException("Serviço não encontrado!"));
    }

    public Page<Servico> getServicos(Pageable pageable, String criadoPor) {
        Usuario usuario = getUsuario(criadoPor);
        return this.repository.findAll(pageable, usuario);
    }

    public Servico getServico(UUID id, String criadoPor) {
        Usuario usuario = getUsuario(criadoPor);
        return this.repository.findById(id, usuario);
    }

    @Transactional
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
