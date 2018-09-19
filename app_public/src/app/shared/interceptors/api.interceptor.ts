import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('auth') && !req.url.includes('fixer')) {
      const token = window.localStorage.getItem('token');
      const clone = req.clone({ setHeaders: { 'x-auth-token': token } });
      return next.handle(clone);
    }
    return next.handle(req); }
}
