import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/core/entidades/cliente/cliente.service';
import { ServicoService } from '../../../core/entidades/servico/servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/entidades/usuario/usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() msgComponent: string = 'Aqui você pode cadastrar um serviço';
  @Output() component: string = 'Serviço';

  formServico: FormGroup = this.formBuilder.group({
    servico: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    cliente: [null, [Validators.required]]
  });

  clientes: any[] = [];
  servico: any;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id: any;
    this.activatedRoute.params
      .subscribe( (res: any) => id = res.id);
    if (id) {
      this.servicoService.getById(id, localStorage.getItem('user_id'))
      .subscribe({
        next: (res) => {
          this.servico = res;
          this.setValues();
        },
        error: (err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro',
              msg: err.error.errors
            }
          })
        }
      });
      this.msgComponent = 'Aqui você pode editar um serviço';
    }

    this.clienteService.list({page: String, size: String, direction: String}, localStorage.getItem('user_id'))
      .subscribe( (res: any) => {
        this.clientes = res.content;
      });
  }

  onSubmit() {
    let servico: any = {
                          servico: this.formServico.get('servico')?.value,
                          descricao: this.formServico.get('descricao')?.value,
                          cliente: this.formServico.get('cliente')?.value,
                          valor: this.formServico.get('valor')?.value,
                          criadoPor: localStorage.getItem('user_id')
                        };

    this.servicoService.create(servico)
      .subscribe({
        next: () => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Sucesso',
              msg: 'Serviço criado com sucesso!'
            }
          });
          this.router.navigate(['/servico'])
        },
        error: (err) => this.dialog.open(DialogComponent, {
          data: {
            title: 'Erro',
            msg: err.error ? err.error : 'Há algum problema no servidor. Tente novamente mais tarde...'
          }
        })
      });
  }

  setValues() {
    this.formServico.get('servico')?.setValue(this.servico?.servico);
    this.formServico.get('descricao')?.setValue(this.servico?.descricao);
    this.formServico.get('cliente')?.setValue(this.servico?.cliente.nome);
    this.formServico.get('valor')?.setValue(this.servico?.valor);
  }

}
