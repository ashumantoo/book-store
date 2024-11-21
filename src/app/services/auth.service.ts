import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../utils/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);

  _isUserLoggedIn = new BehaviorSubject(false);
  _loggedInUsername = new BehaviorSubject("");

  registerUser(registerPayload: any) {
    return this.httpClient.post(API_URLS.register, registerPayload);
  }

  login(loginPayload: any) {
    return this.httpClient.post(API_URLS.login, loginPayload, { withCredentials: true });
  }

  forgetPassword(forgetPasswordData: any) {
    return this.httpClient.post(API_URLS.forgetPassword, forgetPasswordData);
  }

  resetPassword(restData: any) {
    return this.httpClient.post(API_URLS.restPassword, restData);
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('userId');
  }

  getLoggedInUsername() {
    return localStorage.getItem('username') || "";
  }
}
