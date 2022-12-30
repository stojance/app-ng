import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login_bkp(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    let data = {
      username: context.username,
      token: '',
    };

    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  login(context: LoginContext): Observable<any> {
    this.credentialsService.setCredentials();
    const url = 'http://localhost:4000/signin';
    return this.httpClient.post(url, context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
