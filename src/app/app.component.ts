import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './core/entidades/usuario/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './shared/material/dialog/dialog.component';

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
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Olá. Seja bem vindo(a)!',
        msg: 'Por motivos financeiros, este projeto não será conectado ao backend que eu desenvolvi.\nTodos os dados criados por você (usuário), serão salvos no localStorage do seu navegador.'
      },
      backdropClass: 'backdropBackground'
    });

    this.router.events.subscribe((val) => {
      if (this.usuarioService.isAuthenticated()) {
        this.usuario = this.usuarioService.usuarioAutenticado();
        this.id = JSON.parse(localStorage.getItem('user_id') || '');

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
    localStorage.removeItem('usuario');
    this.usuario = null;
  }
}
