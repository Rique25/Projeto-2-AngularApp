import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/entidades/usuario/usuario.service';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent {

  firstFormUsuario: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  });

  secondFormUsuario: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    sexo: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]]
  });

  generos: string[] = ['Masculino', 'Feminino', 'Outro'];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  onSubmit() {
    let dataNascimento: Date = this.secondFormUsuario.get('dataNascimento')?.value;

    const user = {
      usuario: this.firstFormUsuario.get('usuario')?.value,
      senha: this.firstFormUsuario.get('senha')?.value,
      nome: this.secondFormUsuario.get('nome')?.value,
      email: this.secondFormUsuario.get('email')?.value,
      sexo: this.secondFormUsuario.get('sexo')?.value,
      dataNascimento: dataNascimento,
      perfil: 'CLIENTE'
    };

    this.usuarioService.create(user)
      .subscribe({
        next: (res: any) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Sucesso!',
              msg: 'Usuário criado com sucesso!'
            }
          })
        },
        error: (err: any) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro!',
              msg: err.error.detail
            }
          })
          this.router.navigate(['/auth/login']);
        }
      });
  }
}
