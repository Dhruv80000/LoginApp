import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserDetails';

  constructor( private authservice: AuthService, private location: Location) { }

  hide = false;
  hide1 = true;

  ngOnInit() {
    
    if(this.authservice.isLoggedIn()) {
      this.hide = true;
      this.hide1 = false;
    }
  }

  UserLogout() {
    this.authservice.Userlogout();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
