import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  //constructor(private credentialsService: CredentialsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
    let token = '';
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      if (credentials) {
        token = credentials.token;
        // console.log(token);
      }
    }
    const authRequest = request.clone({ setHeaders: { 'x-access-token': token } });

    return next.handle(authRequest);
  }
}
