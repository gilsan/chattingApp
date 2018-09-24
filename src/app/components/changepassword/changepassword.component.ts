import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  passwordForm: FormGroup;
  constructor(
     private fb: FormBuilder,
     private userService: UserService,

  ) {
    this.passwordForm = this.fb.group({
           cPassword: ['', Validators.required],
           newPassword: ['', Validators.required],
           confirmPassword: ['', Validators.required]
    }, { validator: this.Validate.bind(this)});
  }

  ngOnInit(

  ) {
  }

  ChangePassword() {
  //  console.log(this.passwordForm);
    this.userService.ChangePassword(this.passwordForm.value)
     .subscribe( (data) => {

       if (data) {
         this.passwordForm.reset();
       }

     }, err => console.log(err));
  }

  Validate(passwordFormGroup: FormGroup) {

    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

     if (confirm_password !== new_password) {
       return { donNotMatch: true};
     }

     return null;
  }

}
