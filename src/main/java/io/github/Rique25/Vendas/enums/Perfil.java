package io.github.Rique25.Vendas.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Perfil implements GrantedAuthority {

    ADMIN("Administrador"),
    CLIENTE("Cliente");

    private String perfil;

    Perfil(String perfil) {
        this.perfil = perfil;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    @Override
    public String getAuthority() {
        return this.getPerfil();
    }
}
