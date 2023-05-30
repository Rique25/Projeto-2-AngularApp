import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/core/entidades/usuario/usuario.service';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { Usuario } from './model/Usuario';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() component = 'Usuário';
  @Output() msgComponent = 'Aqui você pode atualizar e vizualizar os seus dados';

  sexo: string[] = ['MASCULINO', 'FEMININO', 'OUTRO'];

  formUsuario: FormGroup = this.formBuilder.group({
    nome: [''],
    senha: ['', Validators.required],
    dataNascimento: ['', [Validators.required]],
    sexo: ['']
  });

  usuario: Usuario = new Usuario();

  private id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe((res: any) => this.id = res.id
    );

    this.usuarioService.getById(this.id)
      .subscribe((res: any) => {
        this.usuario?.setUsuario(res?.usuario);
        this.usuario?.setSenha(res?.senha);
        this.usuario?.setNome(res?.nome);
        this.usuario?.setEmail(res?.email);
        this.usuario?.setDataNascimento(res?.dataNascimento);
        this.usuario?.setSexo(res?.sexo);
        this.usuario?.setPerfil(res?.perfil);
    });
  }

  onSubmit() {
    this.usuario?.setSenha(this.formUsuario.get('senha')?.value);
    this.usuario?.setNome(this.formUsuario.get('nome')?.value);
    this.usuario?.setDataNascimento(this.formUsuario.get('dataNascimento')?.value);
    this.usuario?.setSexo(this.formUsuario.get('sexo')?.value);

    this.usuarioService.update(this.usuario, this.id)
      .subscribe({
        next: () => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Sucesso!!',
              msg: 'Atualizado com sucesso!'
            }
          });
        },
        error: (err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro!!',
              msg: err.error.errors
            }
          });
          console.log(err);

        }
      });
  }

}
