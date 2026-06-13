import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleButton } from '../../../components/toggle-button';
import { UserService } from '../../../services/user-service';
import { GLobalService } from '../../../services/global-service';
import { ToastService } from '../../../services/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, CommonModule, ToggleButton],
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.css',
})
export class UserSignup {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private globalService = inject(GLobalService);
  private toastService = inject(ToastService);

  signUpForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required, Validators.minLength(1)]],
    lastName: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  private router = inject(Router);

  signUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    } else {
      const username = this.signUpForm.get('username')?.value ?? '';
      const password = this.signUpForm.get('password')?.value ?? '';
      const firstName = this.signUpForm.get('firstName')?.value ?? '';
      const lastName = this.signUpForm.get('lastName')?.value ?? '';
      const email = this.signUpForm.get('email')?.value ?? '';
      const phone = this.signUpForm.get('phone')?.value ?? '';
      this.globalService.openLoader();
      this.userService
        .signUp({
          username,
          password,
          firstName,
          lastName,
          email,
          phone,
        })
        .subscribe({
          next: (res: any) => {
            this.router.navigate(['/login']);
            this.toastService.addToast('info', 'You are registered');
          },
          error: (err) => {
            this.toastService.addToast('error', err.error.errors.error);
          },
        });
      this.globalService.closeLoader();
    }
  }

  getError(controlName: string): string {
    const control = this.signUpForm.get(controlName);
    if (!control || !control.errors) return '';

    const errorKey = Object.keys(control.errors)[0];
    const errorValue = control.errors[errorKey];

    if (errorKey === 'required') {
      return `${controlName} is required`;
    }
    if (errorKey === 'email') {
      return `Enter valid email`;
    }
    if (errorKey === 'minlength') {
      return `Minimum ${errorValue.requiredLength} characters required`;
    }
    if (errorKey === 'pattern' && controlName === 'phone') return `Enter valid phone number`;

    return '';
  }
}
