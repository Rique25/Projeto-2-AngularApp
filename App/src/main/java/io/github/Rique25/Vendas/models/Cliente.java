package io.github.Rique25.Vendas.models;

import io.github.Rique25.Vendas.enums.Sexo;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Types;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "cliente")
@Data
public class Cliente {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @JdbcTypeCode(Types.CHAR)
    @Column(name = "id", columnDefinition = "char(36)")
    private UUID id;

    @NotNull(message = "Nome é um campo obrigatório")
    @NotEmpty(message = "Nome é um campo obrigatório")
    @Column(nullable = false, length = 100)
    private String nome;

    @NotNull
    @NotEmpty
    @Length(min = 11, max = 11, message = "CPF deve conter 11 caracteres!")
    @Column(nullable = false, length = 11)
    private String cpf;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @ManyToOne
    @JoinColumn(name = "criado_por")
    private Usuario criadoPor;

    @PrePersist
    public void prePersist() {
        setDataCadastro(LocalDate.now());
    }
}
