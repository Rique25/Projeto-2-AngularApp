import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from '../../../pages/servico/models/Servico';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  //private URL: string = environment.URL + '/api';

  constructor(
    private http: HttpClient
  ) { }

  list(params: any, criadoPor: any) {
    let servicos: any[] = JSON.parse(localStorage.getItem('servicos') || '[]');
    let servicosDoUsuario: any[] = [];
    servicos.forEach((servico: any) => {
      if (servico.criadoPor === criadoPor) {
        servicosDoUsuario.push(servico);
      }
    });

    return new Observable((observer) => {
      if (servicosDoUsuario != null) {
        observer.next({content: servicosDoUsuario});
      } else {
        observer.error('Erro ao achar serviços do usuário atual');
      }
    })
    //return this.http.get<Servico[]>(`${this.URL}/servico/${criadoPor}`, params);
  }

  getById(id: string, criadoPor: any) {
    let servicos: any[] = JSON.parse(localStorage.getItem('servicos') || '');
    let servicosDoUsuario: any[] = [];
    servicos.forEach((servico: any) => {
      if (servico.criadoPor === criadoPor && servico.id === id) {
        servicosDoUsuario.push(servico);
      }
    });

    return new Observable((observer) => {
      if (servicosDoUsuario != null) {
        observer.next(servicosDoUsuario);
      } else {
        observer.error('Erro ao achar serviço');
      }
    })
    //return this.http.get<Servico>(`${this.URL}/servico/${id}/${criadoPor}`);
  }

  create(servico: any) {
    debugger
    let servicos: any[] = JSON.parse(localStorage.getItem('servicos') || '[]');
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    let cliente: any;
    let created: boolean = false;

    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id === servico.cliente) {
        cliente = clientes[i];
        break;
      }
    }

    if (cliente) {
      servico.cliente = cliente;
      servico.dataCadastro = new Date();
      servico.id = Math.random().toString();
      servicos.push(servico);
      created = true;
      localStorage.setItem('servicos', JSON.stringify(servicos));
    }

    return new Observable((observer) => {
      if (created) {
        observer.next('Deletado com sucesso');
      } else {
        observer.error('Erro ao achar serviços do usuário atual');
      }
    })
    //return this.http.post(`${this.URL}/servico`, servico);
  }

  update(servico: any, id: string) {
    let servicos: any[] = JSON.parse(localStorage.getItem('servicos') || '');
    let clientes: any[] = JSON.parse(localStorage.getItem('clientes') || '');
    let cliente: any;
    let created: boolean = false;

    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id === servico.cliente) {
        cliente = clientes[i];
        break;
      }
    }

    if (cliente) {
      servico.cliente = cliente;
      for (let i = 0; i < servicos.length; i++) {
        if (servicos[i].id === id) {
          servicos[i].servico = servico.servico;
          servicos[i].valor = servico.valor;
          servicos[i].cliente = servico.cliente;
          servicos[i].descricao = servico.descricao;
          created = true;
          localStorage.setItem('servicos', JSON.stringify(servicos));
          break;
        }
      }
    }

    return new Observable((observer) => {
      if (created) {
        observer.next('Deletado com sucesso');
      } else {
        observer.error('Erro ao achar serviços do usuário atual');
      }
    })
    //return this.http.put(`${this.URL}/servico/${id}`, servico);
  }

  delete(id: string) {
    let servicos: any[] = JSON.parse(localStorage.getItem('servicos') || '');
    let deleted: boolean = false;
    for (let i = 0; i < servicos.length; i++) {
      if (servicos[i].id === id) {
        deleted = true;
        servicos.splice(i, 1);
        localStorage.setItem('servicos', JSON.stringify(servicos));
        break;
      }
    }

    return new Observable((observer) => {
      if (deleted) {
        observer.next('Deletado com sucesso');
      } else {
        observer.error('Erro ao achar serviços do usuário atual');
      }
    })
    //return this.http.delete(`${this.URL}/servico/${id}`);
  }
}
