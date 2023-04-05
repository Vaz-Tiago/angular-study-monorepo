import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

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
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });

    form.reset();
    this.isLoading = false;
  }

  private handleSuccess(data: AuthResponseData) {
    this.router.navigate(['/receitas']);
  }

  private handleError(errorMessage: string) {
    this.error = errorMessage;
  }
}
