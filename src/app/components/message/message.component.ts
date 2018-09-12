import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageServiceService } from '../../services/message-service.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
   receiver: string;
   receiverData: any;
  socket: any;
  user: any;
  msgForm: FormGroup;
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private msgService: MessageServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000');
    this.msgForm = this.fb.group({
      message: [''],

    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
          this.receiver = params.name;
    });
    this.user = this.tokenService.GetPayload();
    this.GetUserByName();
   // this.GetUser();
  }


   GetUserByName() {
     this.userService.GetUserByName(this.receiver)
       .subscribe( (data) => {
         this.receiverData = data.user;
         console.log('Message GetUserByName:', data.user);
       });
   }

  GetUser() {
    this.userService.GetUserById(this.user._id)
     .subscribe( (data) => {
       console.log(data);
     });
  }

  SendMessage() {
    if (this.msgForm.value.message) {

      this.msgService.SendMessage(
        this.user._id,
        this.receiverData._id,
        this.receiverData.username,
        this.msgForm.value.message)
       .subscribe( (data) => {
        this.msgForm.reset();
         console.log(data);
       });

    }


  }

}
