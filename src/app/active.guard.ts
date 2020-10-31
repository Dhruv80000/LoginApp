import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  constructor ( private router: Router, private authservice: AuthService, private auth: AuthTokenService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if(this.authservice.isLoggedIn()) {
      //console.log("Loggin");
      return true;
    } else {
      //console.log("Not Loggin");
      this.router.navigate(['/Notfound']);
    }
  }
}
