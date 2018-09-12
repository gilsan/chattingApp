import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import * as io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit , AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
   postId: any;
   commentArray = [];
   socket: any;
   post: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
    this.toolbarElement = document.querySelector('.nav-content');
    this.socket.on('refreshPage', (data) => {
      this.getPost();
    });
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  init() {
      this.commentForm = this.fb.group({
        comment: ['']
      });

      this.getPost();
  }

  AddCommit() {

    this.postService.addComment(this.postId, this.commentForm.value.comment)
      .subscribe( (data) => {
        this.socket.emit('refresh', {});
        this.commentForm.reset();
      });
  }

  getPost() {
    this.postService.getPosts(this.postId)
     .subscribe( (data) => {
      this.post = data.post.post;
      this.commentArray = data.post.comments.reverse();
     });
  }

  TimeFromNow(time) {
    moment.locale('ko');
    return moment(time).fromNow();
  }

}
