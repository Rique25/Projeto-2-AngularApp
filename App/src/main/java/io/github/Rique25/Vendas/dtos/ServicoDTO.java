package io.github.Rique25.Vendas.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServicoDTO {

    private String servico;
    private String descricao;
    private String cliente;
    private BigDecimal valor;
    private String criadoPor;

}
