import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { AuthTokenService } from './auth-token.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8080/api";

  constructor( private http: HttpClient, private auth: AuthTokenService) { }

  addUser(user: User):Observable<User> {
    return this.http.post<User>(this.baseUrl+"/user", user);
  }

  getUsers():Observable<User []> { 

    return this.http.get<User []>(this.baseUrl+"/users")
    .pipe(map((res :any) => {
      this.auth.getAuthToken();
      return res;
    }))
  }

  EditUser(Userid):Observable<any> {
    return this.http.get<any>(this.baseUrl+"/edit/"+Userid);
  }

  UpdateUser(Userid, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl+"/edit/"+Userid, user);
  }

  DeleteUser(userid): Observable<string> {
    return this.http.delete<string>(this.baseUrl+"/user/"+userid)
  }
}
