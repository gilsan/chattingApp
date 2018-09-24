import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { TokenService } from '../../services/token.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts = [];
  socket: any;
  likes: number;
  user: any;
  EditForm: FormGroup;
  postValue: any;
  modalelement: any;
  constructor(
     private postService: PostService,
     private tokenService: TokenService,
     private router: Router,
     private fb: FormBuilder
  ) {
    this.EditForm = this.fb.group({
      editedPost: ['']
    });

    this.socket = io('http://localhost:3000');

   }

  ngOnInit() {
    this.modalelement = document.querySelector('.modal');
    M.Modal.init(this.modalelement, {});
    this.user =  this.tokenService.GetPayload();
    this.AllPosts();
    this.socket.on('refreshPage', data => {
       this.AllPosts();
    });
  }

  AllPosts() {
    this.postService.getAllPosts()
    .subscribe((data) => {
   //  console.log('posts LikePost: ', data.posts);
       this.posts = data.posts;
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
      //  console.log('posts LikePost: ', data);
        this.socket.emit('refresh', {});
      });
  }

  CheckInLikesArray(arr, username) {
    return _.some(arr, {username: username});
  }

  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }

  OpenEditModal(post) {
  //  console.log(post);
    this.postValue = post;
  }

  DeletePost() {
    this.postService.DeletePost(this.postValue._id)
        .subscribe( (data) => {
          console.log(data);
          this.socket.emit('refresh', {});
        }, err => console.log(err));
        this.CloseModal();
  }

  CloseModal() {
    M.Modal.getInstance(this.modalelement).close();
    this.EditForm.reset();
  }

  SubmitEditedPost() {
    const body = {
      id: this.postValue._id,
      post: this.EditForm.value.editedPost
    };

    this.postService.EditPost(body)
      .subscribe( (data) => {
        console.log(data);
        this.socket.emit('refresh', {});
      }, err => console.log(err));
      this.CloseModal();
      this.EditForm.reset();
  }

}

