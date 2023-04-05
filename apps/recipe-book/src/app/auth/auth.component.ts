import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    const { email, password } = form.value;

    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (resData) => console.debug(resData),
      error: (errMessage) => (this.error = errMessage),
    });

    form.reset();
    this.isLoading = false;
  }
}
