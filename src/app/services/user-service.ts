import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SignUpModel, UserDetailModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;

  private http = inject(HttpClient);

  signUp(data: SignUpModel) {
    return this.http.post(`${this.baseApiUrl}/user/register`, data);
  }

  getUserDetails() {
    return this.http.get(`${this.baseApiUrl}/user/info`);
  }

  updateUserDetails(data: UserDetailModel) {
    return this.http.patch(`${this.baseApiUrl}/user/info`, data);
  }
}
