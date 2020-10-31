import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  constructor( private userservice: UserService, private router: Router) { }

  userData: User;

  ngOnInit(): void {
    this.userservice.getUsers().subscribe(
      (res: any) => {
        //console.log(res);
        if(res.success) {
          this.userData = res.users;
          //console.log(this.userData);
        } else {
          this.router.navigate(['/login']);
        }      
      }
    )
  }
}
