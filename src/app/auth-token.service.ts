import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }


  setAuthToken(token) {
    localStorage.setItem('x-access-token', token);
  }

  getAuthToken() {
    return localStorage.getItem('x-access-token');
  }

  removeAuthToken() {
    localStorage.removeItem('x-access-token');
  }
}
 