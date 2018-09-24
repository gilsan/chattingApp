import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  socket: any;
  user: any;
  followers = [];
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
        console.log(data.user);
         this.followers = data.user.followers;
      });
  }

  FollowerUser(follower)  {
    this.userService.FollowerUser(follower)
     .subscribe( (data) => {
          this.socket.emit('refresh', {});
     });
  }

}
