import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/pages/user/model/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL: string = environment.URL;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  create(usuario: any) {
    return this.http.post(`${this.URL}/auth/signin`, usuario);
  }

  update(usuario: Usuario, id: string) {
    return this.http.put(`${this.URL}/auth/${id}`, usuario);
  }

  login(usuario: any) {
    return this.http.post(`${this.URL}/auth/login`, usuario);
  }

  getById(id: string) {
    return this.http.get(`${this.URL}/auth/${id}`);
  }

  usuarioAutenticado() {
    if (this.isAuthenticated()) {
      const token: string = this.obterToken() || '';
      return this.jwtHelper.decodeToken(token).sub;
    } else {
      return null;
    }
  }

  obterToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated() {
    const token = this.obterToken();

    if (token === "undefined") {
      return false;
    }

    if (token == null) {
      return false;
    }
    const expired = this.jwtHelper.isTokenExpired(token);
    return !expired;
  }
}
