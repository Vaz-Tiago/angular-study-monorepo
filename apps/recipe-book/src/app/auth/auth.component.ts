import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    if (this.isLoginMode) {
      ///
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (resData) => console.debug('create: ', resData),
        error: (err) => {
          this.error = 'Algo deu errado!';
          console.error(err);
        },
      });
    }

    form.reset();
    this.isLoading = false;
  }
}
