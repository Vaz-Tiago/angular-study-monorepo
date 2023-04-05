import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  private userStorageKey = 'userData';
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(this.signupURL, payload)
      .pipe(
        catchError(this.handleErrorResponse),
        tap(this.handleAuthentication.bind(this))
      );
  }

  login(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(this.signingURL, payload)
      .pipe(
        catchError(this.handleErrorResponse),
        tap(this.handleAuthentication.bind(this))
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem(this.userStorageKey);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem(this.userStorageKey));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      userData._tokenExpirationDate
    );

    if (!loadedUser.token) return;

    this.user.next(loadedUser);
    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(data: AuthResponseData) {
    const { email, localId, idToken, expiresIn } = data;
    const formattedExpire = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, formattedExpire);

    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
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
