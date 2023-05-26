import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../entidades/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {

  }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean
    | UrlTree>
    | Promise<boolean
    | UrlTree>
    | boolean
    | UrlTree {
      if (!this.usuarioService.isAuthenticated()) {
        this.router.navigate(['/auth']);
        return false;
      }
    return true;
  }

}
