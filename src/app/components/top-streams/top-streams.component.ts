import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { TokenService } from '../../services/token.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.scss']
})
export class TopStreamsComponent implements OnInit {
  topPosts = [];
  socket: any;
  likes: number;
  user: any;
  constructor(
    private postService: PostService,
     private tokenService: TokenService,
     private router: Router
  ) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.user =  this.tokenService.GetPayload();
    this.AllPosts();
    this.socket.on('refreshPage', data => {

       this.AllPosts();
    });
  }

  AllPosts() {
    this.postService.getAllPosts()
    .subscribe((data) => {
     // console.log('top-stream:' , data);
       this.topPosts = data.top;
    }, err => {
      /**
       * 시간 만기시 자동으로 로그 아웃됨
       */
      if (err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }

  TimeFromNow(time) {
    moment.locale('ko');
    return moment(time).fromNow();
  }

  LikePost(post) {

     this.postService.addLike(post)
      .subscribe( (data) => {
      //  console.log(data);
        this.socket.emit('refresh', {});
      });
  }

  CheckInLikesArray(arr, username) {
    return _.some(arr, {username: username});
  }

  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }

}
