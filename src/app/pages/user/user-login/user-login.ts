import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GLobalService } from '../../../services/global-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  globalService = inject(GLobalService);
  private toastService = inject(ToastService);

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.globalService.openLoader();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const username = this.loginForm.get('username')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      this.authService.login({ username, password }).subscribe({
        next: (res: any) => {
          this.authService.setAuth(res);
          if (this.authService.getUserType() == 'ADMIN') {
            this.globalService.navigate('/admin');
          } else {
            this.globalService.navigate('/');
          }

          this.toastService.addToast('info', 'Welcome to Quizzer');
        },
        error: (err) => {
          this.toastService.addToast('error', err.error.errors.error);
        },
      });
    }
    setTimeout(() => this.globalService.closeLoader(), 1000);
    return;
  }

  getError(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors) return '';

    const errorKey = Object.keys(control.errors)[0];
    const errorValue = control.errors[errorKey];

    if (errorKey === 'required') {
      return 'This field is required';
    }

    if (errorKey === 'minlength') {
      return `Minimum ${errorValue.requiredLength} characters required`;
    }

    return '';
  }
}
