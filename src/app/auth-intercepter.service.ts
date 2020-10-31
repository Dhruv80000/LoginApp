import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token.service';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {

  constructor( private authservice: AuthService, private auth: AuthTokenService) { }

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        return throwError(error);
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.auth.getAuthToken();

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return request;
  }
}
