import { TokenService } from './services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string;
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {

  }
  ngOnInit() {

    this.token = this.tokenService.GetToken();
    if (this.token) {
      this.router.navigate(['streams']);
    } else {
      this.router.navigate(['']);
    }

  }
}
