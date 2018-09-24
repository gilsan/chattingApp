import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, AfterViewInit {

  tabElement: any;
  postsTab = false;
  followingTab = false;
  followersTab = false;
  posts = [];
  following = [];
  followers = [];
  user: any;
  name: string;
  postValue: any;
  EditForm: FormGroup;
  socket: any;
  modalelement: any;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.EditForm = this.fb.group({
      editedPost: ['']
    });
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.postsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});

    this.tabElement = document.querySelector('.nav-content');
    this.route.params.subscribe( (param) => {
     this.name = param.name;
     this.GetUserData(this.name);
    });

    this.modalelement = document.querySelector('.modal');
    M.Modal.init(this.modalelement, {});


  }

  ngAfterViewInit() {
      this.tabElement.style.display = 'none';
  }

  ChangeTab(value) {

    if (value === 'posts') {
      this.postsTab = true;
      this.followingTab = false;
      this.followersTab = false;
    } else if (value === 'following') {
      this.postsTab = false;
      this.followingTab = true;
      this.followersTab = false;
    } else if (value === 'followers') {
      this.postsTab = false;
      this.followingTab = false;
      this.followersTab = true;
    }
  }


  GetUserData(name) {

    this.userService.GetUserByName(name)
     .subscribe( (data) => {
      console.log(data.user);
      this.user = data.user;
       this.posts = data.user.posts;
       this.following = data.user.following;
       this.followers = data.user.followers;

     }, err => console.log(err));
  }

  TimeFromNow(time) {
     moment.locale('ko');
    return moment(time).fromNow();
  }

  OpenEditModal(post) {
    this.postValue = post;
  }

  DeletePost() {
    this.postService.DeletePost(this.postValue.postId._id)
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
      id: this.postValue.postId._id,
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
