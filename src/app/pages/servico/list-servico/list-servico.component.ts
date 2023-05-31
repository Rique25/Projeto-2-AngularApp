import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output } from '@angular/core';
import { ServicoService } from '../../../core/entidades/servico/servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';

@Component({
  selector: 'app-list-servico',
  templateUrl: './list-servico.component.html',
  styleUrls: ['./list-servico.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListServicoComponent implements OnInit {

  @Output() msgComponent: string = 'Aqui estão os serviços cadastrados';
  @Output() component: string = 'Serviço';

  columns = ['servico', 'valor', 'dataCadastro']
  columnsToDisplayWithExpand = [...this.columns, 'descricao'];
  expandedElement: ServicoInterface | undefined;

  servicos = [];

  isLoading: boolean = false;

  constructor(
    private servicoService: ServicoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    return this.servicoService.list({page: String, size: String, direction: String}, JSON.parse(localStorage.getItem('user_id') || ''))
      .subscribe({
        next: (res: any) => this.servicos = res.content
      })
  }

  del(id: string) {
    return this.servicoService.delete(id)
      .subscribe({
        next: () => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Sucesso',
              msg: 'Serviço deletado com sucesso!'
            }
          });
          this.list();
        },
        error: (err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Erro',
              msg: err.error.errors
            }
          });
        }
      });
  }
}

export interface ServicoInterface {
  servico: string;
  valor: number;
  cliente: any;
  dataCadastro: any
}
