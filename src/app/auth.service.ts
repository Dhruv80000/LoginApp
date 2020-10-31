import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { AuthTokenService } from './auth-token.service';
import { map } from 'rxjs/operators';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:8080/api";

  constructor( private http: HttpClient, private auth: AuthTokenService ) { }

  loginUser(user: User) {
    return this.http.post(this.baseUrl+"/authenticate", user)
    .pipe(
      shareReplay(),
      tap((res: any) => {
        this.auth.setAuthToken(res.token);
      }
      )
    )
  }
  
  getUser():Observable<User> { 

    return this.http.get<User>(this.baseUrl+"/me")
    .pipe(map((res :any) => {
      this.auth.getAuthToken();
      return res;
    }))
  }
  isLoggedIn() {
    if(this.auth.getAuthToken()) {
      return true;
    } else {
      return false;
    }
  }

  Userlogout() {
    this.auth.removeAuthToken();
  }
}
