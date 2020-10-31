import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  fname = "";
  lname = "";
  mobile = "";
  email = "";
  dob = "";
  city = "";
  state = "";
  pincode = "";
  id = "";

  constructor( private authservice: AuthService, private router: Router, private userservice: UserService ) { }

  ngOnInit(): void {
    this.authservice.getUser().subscribe(
      (res: any) => {
        if(res.success) {
          //console.log(res.user);
          this.fname = res.user.fname;
          this.lname = res.user.lname;
          this.mobile = res.user.mobile;
          this.email = res.user.email;
          this.dob = res.user.dob;
          this.city = res.user.city;
          this.state = res.user.state;
          this.pincode = res.user.pincode;
          this.id = res.user._id;
        } else {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  edituser(Userid) {
    //console.log(Userid);
    this.router.navigate(['edit/'+Userid]);
  }
}
