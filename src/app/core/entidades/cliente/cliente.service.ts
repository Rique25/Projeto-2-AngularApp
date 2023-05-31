import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../../pages/cliente/models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private URL: string = environment.URL + '/api';

  constructor(
    private http: HttpClient
  ) { }

  salvar(cliente: any) {
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    cliente.dataCadastro = new Date();
    cliente.id = Math.random().toString();
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    return new Observable((observer) => {
      if (cliente != null) {
        observer.next(cliente);
      } else {
        observer.error('Não foi possível cadastrar o cliente');
      }
    });
    //return this.http.post<Cliente>(`${this.URL}/cliente`, cliente);
  }

  update(cliente: any) {
    debugger
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    let updated: boolean = false;
    clientes.forEach((c: any) => {
        if (c.id === cliente.id) {
          updated = true;
          c.nome = cliente.nome;
          c.cpf = cliente.cpf;
          c.sexo = cliente.sexo;
        }
    });
    localStorage.setItem('clientes', JSON.stringify(clientes));
    return new Observable((observer) => {
      if (updated) {
        observer.next(cliente);
      } else {
        observer.error("Erro ao atualizar o cliente.");
      }
    });
    //return this.http.put<Cliente>(`${this.URL}/cliente/${cliente.getId()}`, cliente);
  }

  list(params: any, criadoPor: any) {
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '[]');

    let clientesDoUsuario: any[] = [];
    clientes.forEach((cliente: any) => {
        if (cliente.criadoPor === criadoPor) {
          clientesDoUsuario.push(cliente);
        }
    });

    return new Observable((observer) => {
      if (clientesDoUsuario != null) {
        observer.next({content: clientesDoUsuario});
      } else {
        observer.error('Não foi possível listar os clientes desse usuário');
      }
    });
    //return this.http.get(`${this.URL}/cliente/${criadoPor}`);
  }

  getById(id: string, criadoPor: any) {
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '[]');

    clientes.map((cliente: any) => {
        if (cliente.criadoPor === criadoPor) {
          return cliente;
        }
    });

    const cliente = clientes.filter((c: any) => {
      if (c.id === id) {
        return c;
      }
    });

    return new Observable((observer) => {
      if (cliente != null) {
        observer.next(cliente);
      } else {
        observer.error("Não foi possível localizar esse cliente")
      }
    });
    //return this.http.get(`${this.URL}/cliente/${id}/${criadoPor}`);
  }

  delete(id: string) {
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    let deleted: boolean = false;
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id === id) {
        deleted = true;
        clientes.splice(i, 1);
      }
    }

    localStorage.setItem('clientes', JSON.stringify(clientes));

    return new Observable((observer) => {
      if (deleted) {
        observer.next('Deletado com sucesso!');
      } else {
        observer.error('Erro ao deletar o cliente!');
      }
    });
    //return this.http.delete(`${this.URL}/cliente/${id}`);
  }
}
