import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthModel, LoginModel } from '../models/AuthModel';
import { Router } from '@angular/router';
import { catchError, of, take, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  private baseApiUrl = environment.baseApiUrl;
  private router = inject(Router);

  isLoggedIn = signal(false);

  constructor(private http: HttpClient) {}

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  verifyAuth() {
    const auth = this.getAuth();

    if (auth?.token == null) {
      this.isLoggedIn.set(false);
      return of(null);
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${auth.token}` });
    return this.http.get(`${this.baseApiUrl}/auth/verify`, { headers }).pipe(
      take(1),
      tap((res: any) => {
        if (res.data.isAuthenticated == true) {
          this.isLoggedIn.set(true);
        } else {
          this.isLoggedIn.set(false);
        }
      }),
      catchError((err) => {
        this.isLoggedIn.set(false);
        return of(null);
      }),
    );
  }

  login(data: LoginModel) {
    return this.http.post(`${this.baseApiUrl}/auth/login`, data);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.removeAuth();
    this.router.navigate(['/']);
  }

  getAuth() {
    if (!this.isBrowser()) {
      return null;
    }
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const tokenType = localStorage.getItem('tokenType');
    const expiryTime = localStorage.getItem('expiresOn');
    console.log();

    return { token, tokenType, role, expiryTime };
  }

  setAuth(data: AuthModel) {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('role', data.role);
    localStorage.setItem('tokenType', data.tokenType);
    localStorage.setItem('expiresOn', data.expiresOn);
    this.isLoggedIn.set(true);
  }

  removeAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresOn');
  }

  getUserType() {
    const role = localStorage.getItem('role');
    return role;
  }
}
