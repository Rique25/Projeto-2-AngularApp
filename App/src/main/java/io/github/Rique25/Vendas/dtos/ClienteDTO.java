package io.github.Rique25.Vendas.dtos;

import io.github.Rique25.Vendas.enums.Sexo;
import lombok.Data;

@Data
public class ClienteDTO {

    private String nome;
    private String cpf;
    private Sexo sexo;
    private String criadoPor;
}
