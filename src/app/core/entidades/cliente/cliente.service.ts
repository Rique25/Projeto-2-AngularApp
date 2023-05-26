import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../../pages/cliente/models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL: string = environment.URL + '/api';

  constructor(
    private http: HttpClient
  ) { }

  salvar(cliente: any): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.URL}/cliente`, cliente);
  }

  update(cliente: any): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.URL}/cliente/${cliente.getId()}`, cliente);
  }

  list(params: any, criadoPor: any) {
    return this.http.get(`${this.URL}/cliente/${criadoPor}`);
  }

  getById(id: string, criadoPor: any) {
    return this.http.get(`${this.URL}/cliente/${id}/${criadoPor}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.URL}/cliente/${id}`);
  }
}
