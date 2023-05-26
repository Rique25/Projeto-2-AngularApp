package io.github.Rique25.Vendas.models;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Types;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "servico")
@Data
public class Servico {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @JdbcTypeCode(Types.CHAR)
    @Column(name = "id", columnDefinition = "char(36)")
    private UUID id;

    @NotEmpty
    @NotNull
    @Column(name = "servico")
    private String servico;

    @NotEmpty
    @NotNull
    @Column
    private String descricao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @NotNull
    @Column
    private BigDecimal valor;

    @Column
    private LocalDate dataCadastro;

    @ManyToOne
    @JoinColumn(name = "criado_por")
    private Usuario criadoPor;

    @PrePersist
    public void prePersist() {
        this.setDataCadastro(LocalDate.now());
    }
}
