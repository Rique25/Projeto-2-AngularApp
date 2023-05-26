package io.github.Rique25.Vendas.exceptions;

public class BadRequestException extends RuntimeException {

    private static final long serialVersionUUID = 1L;

    public BadRequestException(String ex) {
        super(ex);
    }
}
