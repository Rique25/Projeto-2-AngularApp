package io.github.Rique25.Vendas.dtos;

import io.github.Rique25.Vendas.models.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDTO {

    private Usuario usuario;
    private String token;
}
