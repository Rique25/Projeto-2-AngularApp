import { Component, OnInit, Output } from '@angular/core';

import { ClienteService } from '../../../core/entidades/cliente/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaClientesComponent implements OnInit {

  @Output() msgComponent: string = 'Aqui está a lista de clientes cadastrados';
  @Output() component: string = 'Cliente';

  displayedColumns: string[] = ['nome', 'cpf', 'sexo', 'dataCadastro', 'editar'];
  clientes = [];

  isLoading: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.isLoading = true;
    return this.clienteService.list({page: String, size: String, direction: String}, JSON.parse(localStorage.getItem('user_id') || ''))
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.clientes = res.content;
          this.isLoading = false;
        },
        error: (err) => {
            this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro!',
              msg: err.error
            }
          });
          console.log(err);
        }
      });
  }

  del(id: string) {
    this.clienteService.delete(id)
    .subscribe({
      next: (res: any) => {;
        this.isLoading = false;
        this.list();
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Sucesso!',
            msg: 'Cliente deletado com sucesso'
          }
        })
      },
      error: (err) => this.dialog.open(DialogComponent, {
        data: {
          title: 'Erro!',
          msg: err.error
        }
      })
    });
  }
}
