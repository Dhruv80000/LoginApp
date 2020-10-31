import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  EditForm : FormGroup;
  Userid : String;
  msg: string;
  type: string;

  constructor( private fb: FormBuilder, private router: Router, private userservice: UserService, private route: ActivatedRoute, private authservice: AuthService ) {
    this.EditForm = fb.group({
      fname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,10}$/)]],
      lname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,10}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)]],
      dob: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,20}$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,10}$/)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (res: Params) => {
        this.Userid = res.id;
      //  console.log(this.Userid);
      }
    )
    
    this.userservice.EditUser(this.Userid).subscribe(
      (res) => {
       // console.log(res);
        if(res.success == true) {
          this.EditForm.patchValue({
            fname: res.user.fname,
            lname: res.user.lname,
            dob: (res.user.dob),
            city: res.user.city,
            state: res.user.state,
            email: res.user.email,
            mobile: res.user.mobile,
            pincode: res.user.pincode
          });
        } else {
          this.type = "danger";
          this.msg = res.message;
        }
      }
    )
  }

  editUser() {
    let EditValue = this.EditForm.value;
    //console.log(EditValue);
    this.userservice.UpdateUser(this.Userid, EditValue).subscribe(
      (res: any) => {
        if(res.success) {
          //console.log(res);
          this.router.navigate(['/profile']);
        } else {
          this.type = "danger";
          this.msg = res.message;
        }
      }
    )
  }

  resetForm() {
    this.EditForm.reset();
  }

  DeleteUser() {
   // console.log(this.Userid);
    let x = confirm('Are sure delete your account ?');
    if(x == true) {
      this.userservice.DeleteUser(this.Userid).subscribe(
        (res: any) => {
          if(res.success) {
            //console.log(res);
            this.authservice.Userlogout();
            setTimeout(() => {
              window.location.reload();
            }, 100);
            this.router.navigate(['/login']);
          } else {
            this.type = "danger";
            this.msg = res.message;
          }
        }
      )  
    } else {
      window.location.reload();
    }
    
  }
}
