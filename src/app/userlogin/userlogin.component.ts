import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AuthTokenService } from '../auth-token.service';
import { User } from '../user';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;
  type: string;

  constructor( private router: Router, private fb: FormBuilder, private authservice: AuthService, private auth: AuthTokenService ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  loginUser() {
    let login = this.loginForm.value;
    //console.log(login);
    this.authservice.loginUser(login).subscribe(
      (res: any) => {
        //console.log(res);
        if(res.success) {
          setTimeout(() => {
            window.location.reload();
          }, 100);
          this.router.navigate(['/userdata']);
        } else {
          this.type = "danger";
          this.msg = res.message;
        }
      }
    )
  }

  NewAcc() {
    this.router.navigate(['/register']);
  }
}
