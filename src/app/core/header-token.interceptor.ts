import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HeaderTokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 403) {
          localStorage.clear();
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      }),
      map((event: HttpEvent<any>) => event)
    );
  }
}
