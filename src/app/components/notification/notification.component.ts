import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import * as io from 'socket.io-client';
import * as moment from 'moment';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  socket: any;
  user: any;
  notifications = [];
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    console.log('GetUser: ', this.user._id);
    this.userService.GetUserById(this.user._id)
     .subscribe( (data) => {
       console.log(data);
       this.notifications = data.user.notifications.reverse() ;
     });
  }

  TimeFromNow(time) {
    moment.locale('ko');
    return moment(time).fromNow();
  }

  MarkNotification(data) {
    this.userService.MarkNotification(data._id)
    .subscribe( (value) => {
      this.socket.emit('refresh', {});
    });
  }

  DeleteNotification(data) {
    this.userService.MarkNotification(data._id, true)
    .subscribe( (value) => {

      this.socket.emit('refresh', {});
    });
  }

}
