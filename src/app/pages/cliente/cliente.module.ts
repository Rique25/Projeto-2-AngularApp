import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';


@NgModule({
  declarations: [
    ListaClientesComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
