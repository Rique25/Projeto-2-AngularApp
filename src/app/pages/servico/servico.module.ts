import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servico-routing.module';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListServicoComponent } from './list-servico/list-servico.component';


@NgModule({
  declarations: [
    FormComponent,
    ListServicoComponent
  ],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ServicoModule { }
