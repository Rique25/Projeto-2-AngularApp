import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './core/entidades/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usuario: any;
  id: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (this.usuarioService.isAuthenticated()) {
        this.usuario = this.usuarioService.usuarioAutenticado();
        this.id = localStorage.getItem('user_id') || '';

        let cont = document.getElementById('container');
        if (cont instanceof HTMLElement) {
          cont.style.height = '92vh';
        }
      } else {
        this.usuario = null;

        let cont = document.getElementById('container');
        if (cont instanceof HTMLElement) {
          cont.style.height = '100vh';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token')
    this.usuario = null;
  }
}
