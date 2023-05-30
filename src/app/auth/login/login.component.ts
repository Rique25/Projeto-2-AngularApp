import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/entidades/usuario/usuario.service';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formUsuario: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {

  }

  onSubmit(){
    const user = {
      username: this.formUsuario.get('usuario')?.value,
      password: this.formUsuario.get('senha')?.value
    };

    this.usuarioService.login(user)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem("access_token", JSON.stringify(res.token));
          localStorage.setItem("user_id", JSON.stringify(res.usuario.id));
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.router.navigate(['./']);
        },
        error: (err: any) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro!',
              msg: err.error.errors
            }
          })
        }
      });
    this.router.navigate(['/']);
  }

}
