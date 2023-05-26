package io.github.Rique25.Vendas.models;

import io.github.Rique25.Vendas.enums.Perfil;
import io.github.Rique25.Vendas.enums.Sexo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Types;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Data
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {

    @Id
    @GenericGenerator(name= "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "UUID")
    @JdbcTypeCode(Types.CHAR)
    @Column(name = "id", columnDefinition = "char(36)")
    private UUID id;

    @NotEmpty(message = "Usuário é um campo obrigatório")
    @Column(nullable = false, unique = true)
    private String usuario;

    @NotEmpty(message = "Senha é um campo obrigatório")
    @Length(min = 8, message = "A sua senha deve conter pelo menos 8 caracteres")
    @Column(nullable = false)
    private String senha;

    @NotEmpty(message = "Nome é um campo obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotEmpty(message = "Email é um campo obrigatório")
    @Email(message = "Email não formatado!")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @Column(nullable = false, name = "data_nascimento")
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Perfil perfil;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(this.perfil);
    }

    @Override
    public String getPassword() {
        return this.getSenha();
    }

    @Override
    public String getUsername() {
        return this.getUsuario();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
