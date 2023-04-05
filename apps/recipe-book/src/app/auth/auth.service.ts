import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private signupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`;
  private signingURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(this.signupURL, payload)
      .pipe(catchError(this.handleErrorResponse));
  }

  login(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(this.signingURL, payload)
      .pipe(catchError(this.handleErrorResponse));
  }

  private handleErrorResponse(err: any) {
    const errorMap = {
      EMAIL_EXISTS: 'Email em uso',
      EMAIL_NOT_FOUND: 'Email ou senha inválido.',
      INVALID_PASSWORD: 'Email ou senha inválido.',
    };

    const genericMessage = 'Erro desconhecido.';
    const apiErrorMessage = err?.error?.error?.message;
    const knownError = errorMap[apiErrorMessage];
    const errorMessage = knownError ? knownError : genericMessage;

    return throwError(() => errorMessage);
  }
}
