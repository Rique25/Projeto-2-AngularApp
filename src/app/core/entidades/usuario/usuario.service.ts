import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/pages/user/model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private URL: string = environment.URL;
  //private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  create(user: any): Observable<any> {
    let usuario: Usuario = new Usuario();
    const id = Math.random().toString();

    usuario.setId(id);
    usuario.setUsuario(user.usuario);
    usuario.setSenha(user.senha);
    usuario.setSexo(user.sexo);
    usuario.setPerfil(user.perfil);
    usuario.setNome(user.nome);
    usuario.setEmail(user.email);
    usuario.setDataNascimento(user.dataNascimento);

    let usuarios: Usuario[] = this.getUsuarios();
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return new Observable((observer) => {
      observer.next(usuario);
    });
    //return this.http.post(`${this.URL}/auth/signin`, usuario);
  }

  getUsuarios(): Usuario[] {
    const usuarios: any = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
  }

  update(user: any, id: string) {
    let usuarios: any[] = this.getUsuarios();
    debugger
    let usuario: Usuario | null = null;
    let index: number = 0;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id === id) {
        usuario = usuarios[i];
        index = i;
      }
    }
    if (usuario) {
      user.id = id;
      usuarios.splice(index, 1);
      usuarios.push(user);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return new Observable((observer) => {
        observer.next(user);
      });
    }
    return new Observable((observer) => {
      observer.error({error: {errors: ['Usuário não encontrado!']}});
    });
    //return this.http.put(`${this.URL}/auth/${id}`, usuario);
  }

  login(user: any) {
    const usuarios: any[] = this.getUsuarios();
    let usuario: Usuario | null = null;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].usuario === user.username && usuarios[i].senha === user.password) {
        usuario = usuarios[i];
      }
    }
    if (usuario) {
      return new Observable((observer) => {
        observer.next({token: 'token', usuario: usuario});
      });
    }
    return new Observable((observer) => {
      observer.error({error: {errors: ['Usuário ou senha incorretos!']}});
    });
    //return this.http.post(`${this.URL}/auth/login`, usuario);
  }

  getById(id: string) {
    const usuarios: any[] = this.getUsuarios();
    let usuario: Usuario | null = null;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id === id) {
        usuario = usuarios[i];
      }
    }
      if (usuario) {
        return new Observable((observer) => {
          observer.next(usuario);
        });
      }
      return new Observable((observer) => {
        observer.error({error: {errors: ['Usuário não encontrado!']}});
      });
    //return this.http.get(`${this.URL}/auth/${id}`);
  }

  usuarioAutenticado() {
    if (this.isAuthenticated()) {
      //const token: string = this.obterToken() || '';
      //return this.jwtHelper.decodeToken(token).sub;
      const token = JSON.parse(localStorage.getItem('usuario') || '');
      return token;
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
    const expired = token === 'token';
    return !expired;
  }
}
