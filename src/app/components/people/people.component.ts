import { Component, OnInit,   } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import * as _ from 'lodash';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit  {

  loggedUsername: any;
  users = [];
  userArr = [];
  socket: any;
  constructor(
    private usersService: UserService,
    private tokenService: TokenService
  ) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {

    this.loggedUsername = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();
    this.GetUserByName();

    this.socket.on('refreshPage', () => {
      this.GetUsers();
      this.GetUser();
    });
  }


  GetUsers() {
    this.usersService.GetAllUsers()
      .subscribe( (data) => {
        _.remove(data.result, {username:  this.loggedUsername.username} );
        this.users = data.result;
      });
  }

  GetUser() {
     this.usersService.GetUserById(this.loggedUsername._id)
     .subscribe( (data) => {
      this.userArr = data.user.following;
    });
  }

  GetUserByName() {
    this.usersService.GetUserByName(this.loggedUsername.username)
    .subscribe( (data) => {
   //  console.log(data);
   //  this.users = data.result;
   });
  }

  FollowUser(user) {
   this.usersService.FollowUser(user._id)
     .subscribe( (data) => {
       this.socket.emit('refresh', {});
     });
  }

  CheckInArray(arr, id) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    }
    return false;
  }

}
