import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { GLobalService } from '../../../services/global-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private userSevice = inject(UserService);

  private fb = inject(FormBuilder);
  private globalService = inject(GLobalService);
  private toastService = inject(ToastService);

  profileForm = this.fb.group({
    username: [{ value: '', disabled: true }],
    firstName: ['', [Validators.required, Validators.minLength(1)]],
    lastName: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
  });

  ngOnInit(): void {
    this.globalService.openLoader();
    this.userSevice.getUserDetails().subscribe({
      next: (res: any) => {
        console.log('res ,', res.data);
        let formData = res.data;
        this.profileForm.setValue({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
        });

        this.globalService.closeLoader();
      },
      error: (err: any) => {
        this.globalService.closeLoader();
        this.toastService.addToast('error', err.error.errors.error);
      },
    });
  }

  updateUserDetails() {
    this.globalService.openLoader();
    const username = this.profileForm.get('username')?.value ?? '';
    const firstName = this.profileForm.get('firstName')?.value ?? '';
    const lastName = this.profileForm.get('lastName')?.value ?? '';
    const email = this.profileForm.get('email')?.value ?? '';
    const phone = this.profileForm.get('phone')?.value ?? '';
    this.userSevice
      .updateUserDetails({
        username,
        firstName,
        lastName,
        email,
        phone,
      })
      .subscribe({
        next: (res: any) => {
          let formData = res.data;
          this.profileForm.setValue({
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
          });

          this.globalService.closeLoader();
          this.toastService.addToast('info', 'profile updated');
        },
        error: (err) => {
          this.globalService.closeLoader();
          this.toastService.addToast('error', err.error.errors.error);
        },
      });
  }
}
