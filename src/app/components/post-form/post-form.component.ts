import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

    socket: any;
    postForm: FormGroup;
  constructor(
     private fb: FormBuilder,
     private postService: PostService
  ) {
    /********************
     * global is not defined 에러발생
     * angular 5에서는 발생하지 않고, angular6 에서발생함
     * polyfills.ts 에서 (window as any).global = window;
     */
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
    post: [''],

    });
  }

  submitPost() {

    this.postService.addPost(this.postForm.value)
    .subscribe( (data) => {
      this.socket.emit('refresh', {data: data.msg.post});
      this.postForm.reset();
    });

  }

}
