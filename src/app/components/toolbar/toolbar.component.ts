import { Component, OnInit,   } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import * as M from 'materialize-css';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user: any;
  payload: any;
  notifications = [];
  socket: any;
  count = [];
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user =  this.tokenService.GetPayload();
    this.GetUser();
    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('.dropdown-trigger');
      const instances = M.Dropdown.init(elems, {
        hover: true, alignment: 'right' , coverTrigger: false
      });
    });

    this.socket.on('refreshPage', () => {
       this.GetUser();
    });


  }

  logout() {

    this.tokenService.DeleteToken();
    this.router.navigate(['']);

  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  GetUser() {
    this.userService.GetUserById(this.user._id)
      .subscribe( (data) => {
     //  console.log('toolbar: ', data.user.notifications);
        this.notifications = data.user.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
      });
  }

  MarkAllAsRead() {
    this.userService.MarkAllAsRead()
     .subscribe( (data) => {
         console.log('toolbar: ', data);
         this.socket.emit('refresh', {});
     });
  }

  TimeFromNow(time) {
    moment.locale('ko');
    return moment(time).fromNow();
  }

}
