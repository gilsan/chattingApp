import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  progress = false;
  token: string;
  errorMessage: string;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService

  ) {
    this.loginForm = fb.group({
       email: ['', [Validators.required]],
       password: ['', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    this.progress = true;
    this.authService.login(this.loginForm.value)
      .subscribe((data) => {
          this.loginForm.reset();
          console.log('login: ', data.token);
          this.tokenService.SetToken(data.token);
          this.progress = false;
          this.router.navigate(['streams']);
      }, err => {
        this.progress = false;
        this.errorMessage = err.error.msg;
      });

  }

}
