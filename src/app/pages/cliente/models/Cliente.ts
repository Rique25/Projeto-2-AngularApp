export class Cliente {

  private id? : string = '';
  private nome: string;
  private cpf: string;
  private sexo: string;
  private criadoPor: string;

  constructor(nome: string, cpf: string, sexo: string, criadoPor: string) {
    this.nome = nome;
    this.cpf = cpf;
    this.sexo = sexo;
    this.criadoPor = criadoPor;
  }

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome: string) {
    this.nome = nome;
  }

  getCpf() {
    return this.cpf;
  }

  setCpf(cpf: string) {
    this.cpf = cpf;
  }

  getSexo() {
    return this.sexo;
  }

  setSexo(sexo: string) {
    this.sexo = sexo;
  }

  getCriadoPor() {
    return this.criadoPor;
  }

  setCriadoPor(usuario: string) {
    this.criadoPor = usuario;
  }
}
