export class Usuario {

  private id?: string;
  private usuario?: string;
  private senha?: string;
  private nome?: string;
  private email?: string;
  private dataNascimento?: Date;
  private sexo?: string;
  private perfil?: string;

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getUsuario() {
    return this.usuario;
  }

  public setUsuario(usuario: string) {
    this.usuario = usuario;
  }

  public getSenha() {
    return this.senha;
  }

  public setSenha(senha: string) {
    if (senha) {
      this.senha = senha;
    }
  }

  public getNome() {
    return this.nome;
  }

  public setNome(nome: string) {
    if (nome) {
      this.nome = nome;
    }
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getDataNascimento() {
    return this.dataNascimento;
  }

  public setDataNascimento(data: Date) {
    if (data) {
      this.dataNascimento = data;
    }
  }

  public getSexo() {
    return this.sexo;
  }

  public setSexo(sexo: string) {
    if (sexo) {
      this.sexo = sexo.toUpperCase();
    }
  }

  public getPerfil() {
    return this.perfil;
  }

  public setPerfil(perfil: string) {
    this.perfil = perfil.toUpperCase();
  }
}
