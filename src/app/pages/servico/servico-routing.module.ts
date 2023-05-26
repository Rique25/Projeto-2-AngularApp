import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListServicoComponent } from './list-servico/list-servico.component';



const routes: Routes = [
  {
    path: '', redirectTo: 'lista', pathMatch: 'full'
  },
  {
    path: 'lista', component: ListServicoComponent
  },
  {
    path: 'cadastrar', component: FormComponent
  },
  {
    path: 'atualizar/:id', component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
