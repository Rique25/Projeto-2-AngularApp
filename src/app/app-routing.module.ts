import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'usuario/:id', component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./pages/cliente/cliente.module').then(c => c.ClienteModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'servico',
    loadChildren: () => import('./pages/servico/servico.module').then(m => m.ServicoModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
