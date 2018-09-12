import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: string;
  progress = false;
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.signupForm = fb.group({
      username: ['', [Validators.required]],
      email: ['' , [Validators.required]],
       password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  signupUser() {
    this.progress = true;
    this.authService.registerUser(this.signupForm.value)
      .subscribe((data) => {
          this.signupForm.reset();
          this.tokenService.SetToken(data.token);
          this.progress = false;
          this.router.navigate(['streams']);
      }, err => {
        this.progress = false;
        this.errorMessage = err.error.msg;
      });
  }

}
