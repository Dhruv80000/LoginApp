import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css']
})
export class UserregComponent implements OnInit {

  userForm: FormGroup; 
  msg: string;
  type: string;
  
  constructor( private fb: FormBuilder, private router: Router, private userservice: UserService) {
    this.userForm = fb.group({
      fname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,10}$/)]],
      lname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,10}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)]],
      dob: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,20}$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,10}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)]],
      confirmpassword: ['', Validators.required]
    }, {
      validators: ConfirmedValidator('password', 'confirmpassword')
    });
  }

  ngOnInit(): void {
  }

  createUser() {
   // console.log(this.userForm.value);
    let user = this.userForm.value;
    this.userservice.addUser(user).subscribe(
      (res: any) => {
     //   console.log(res);
        if(res.success) {
          this.resetForm();
          this.router.navigate(['/login']);
        } else {
          this.type = "danger";
          this.msg = res.message;
        }  
      }
    )
  }

  resetForm() {
    this.userForm.reset();
  }
}
