import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  socket: any;
  user: any;
  userData: any;
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.socket = io('http://localhost:3000');
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.userService.GetUserById(this.user._id)
     .subscribe( (data) => {

         this.userData = data.user;
     });
  }

}
