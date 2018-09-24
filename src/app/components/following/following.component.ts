import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  socket: any;
   following = [];
   user: any;
  constructor(
    private tokenServie: TokenService,
    private userService: UserService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenServie.GetPayload();
    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
     this.userService.GetUserById(this.user._id)
      .subscribe( (data) => {

        this.following = data.user.following;
      });
  }


  UnFollowUser(user) {
     this.userService.UnFollowUser(user._id)
       .subscribe( (data) => {
         this.socket.emit('refresh', {});
       });
  }



}
