import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cliente } from '../models/Cliente';
import { ClienteService } from '../../../core/entidades/cliente/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/entidades/usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() msgComponent: string = 'Aqui você pode cadastrar um cliente';
  @Output() component: string = 'Cliente';

  public formCliente: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.nullValidator]],
    cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.nullValidator]],
    sexo: ['', [Validators.required]]
  });

  cliente: any;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    let id: any;
    this.activatedRoute.params
      .subscribe( (res: any) => id = res.id);

    if (id) {
      this.clienteService.getById(id, localStorage.getItem('user_id'))
        .subscribe( (res: any) => {
          this.cliente = res;
          this.setValues();
        });

      this.msgComponent = 'Aqui você pode atualizar os dados do seu cliente'
    }
  }

  setValues() {
    this.formCliente.get('nome')?.setValue(this.cliente?.nome);
    this.formCliente.get('cpf')?.setValue(this.cliente?.cpf);
    this.formCliente.get('sexo')?.setValue(this.cliente?.sexo);
  }

  numberToString() {
    if (this.formCliente.value.sexo == 0) {
      return 'MASCULINO'
    } else if (this.formCliente.value.sexo == 1) {
      return 'FEMININO'
    }
    return 'OUTRO'
  }

  onSubmit() {
    const usuario: any = localStorage.getItem('user_id');
    let cliente = {nome: this.formCliente.value.nome,
                   cpf:  this.formCliente.value.cpf,
                   sexo: this.numberToString(),
                   criadoPor: usuario};
                              console.log(cliente);

    if (this.cliente) {
      this.update(cliente);
    } else {
      this.create(cliente);
    }
    this.formCliente.enable();
  }

  create(cliente: any) {
    this.formCliente.reset();
    this.formCliente.get('sexo')?.setValue('MASCULINO')
    this.clienteService
      .salvar(cliente)
      .subscribe({
        next: () => {
          this.dialog.open(DialogComponent, {
            data: {
              title: "Sucesso!",
              msg: 'Cliente criado com sucesso!'
            }
          });
          this.router.navigate(['/cliente'])
        },
        error: (err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro!',
              msg: err.error.errors
            }
          });
        }
      });
  }

  update(cliente: any) {
    cliente.setId(this.cliente?.id);
    this.clienteService
      .update(cliente)
      .subscribe({
        next: () => {
          this.dialog.open(DialogComponent, {
            data: {
              title: "Sucesso!",
              msg: 'Cliente atualizado com sucesso!'
            }
          });
        },
        error: (err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro!',
              msg: err.error.errors
            }
          });
        }
      });
  }
}

