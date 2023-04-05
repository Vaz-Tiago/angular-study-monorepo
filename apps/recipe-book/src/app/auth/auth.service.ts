import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private signupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http.post<AuthResponseData>(this.signupURL, payload);
  }
}
