import { Component, OnInit, Output, EventEmitter, AfterViewInit,   } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import * as M from 'materialize-css';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import * as _ from 'lodash';
import { MessageServiceService } from '../../services/message-service.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Output() onlineUsers = new EventEmitter();
  user: any;
  payload: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;
  imageId: string;
  imageVersion: string;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private msgService: MessageServiceService
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

    document.addEventListener('DOMContentLoaded', () => {
      const elemsTwo = document.querySelectorAll('.dropdown-trigger2');
      const instances = M.Dropdown.init(elemsTwo, {
        hover: true, alignment: 'left' , coverTrigger: false
      });
    });

    this.socket.emit('online', { room: 'global', user: this.user.username});


    this.socket.on('refreshPage', () => {
       this.GetUser();
    });
  }

  ngAfterViewInit() {
    this.socket.on('usersOnline', (data) => {
     //    console.log('message ngAfterViewInit => chat component online', data);
         this.onlineUsers.emit(data);
    });

  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  GoToChatPage(username) {
     console.log('GoToChatPage: ', username);
     this.router.navigate(['chat', username]);
     this.msgService.ReceiverMarkMessage(this.user.username, username)
       .subscribe( (data) => {
         console.log(data);
         this.socket.emit('refresh', {});
       });
  }

  MarkAllMessages() {
    this.msgService.MarkAllMessages()
      .subscribe( (data) => {
             console.log(data);
             this.socket.emit('refresh', {});
             this.msgNumber = 0;
      });
  }

  GetUser() {
    this.userService.GetUserById(this.user._id)
      .subscribe( (data) => {
       // console.log('toolbar GetUser: ', data.user.chatList);
        this.imageId = data.user.picId;
        this.imageVersion = data.user.picVersion;
        this.notifications = data.user.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
        this.chatList = data.user.chatList;

         this.CheckIfread(this.chatList);
      });
  }

  MarkAllAsRead() {
    this.userService.MarkAllAsRead()
     .subscribe( (data) => {
       //  console.log('toolbar: ', data);
         this.socket.emit('refresh', {});
     });
  }

  TimeFromNow(time) {
    moment.locale('ko');
    return moment(time).fromNow();
  }

  MessageDate(data) {
    return moment(data).calendar(null, {
         samdDay: '[오늘]',
         lastDay: '[어제]',
         lastWeek: 'YYYY-MM-DD',
         sameElse: 'YYYY-MM-DD',
    });
  }

  CheckIfread(arr) {
    const checkArr = [];

    for ( let i = 0 ; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (this.router.url !== `/chat/${receiver.sendername}` ) {
      //  console.log('[' + i + '][' + receiver.isRead + '][' + receiver.receivername + '][' + this.user.username + ']' );
         if (receiver.isRead === false && receiver.receivername === this.user.username ) {
           checkArr.push(1);
           this.msgNumber = _.sum(checkArr);
         }
      }
    }
  }

}
