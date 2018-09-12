import { HttpClientModule, } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { LayoutModule, DropdownModule, BoxModule, TabsModule, } from 'angular-admin-lte';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';

import { adminLteConf } from './admin-lte.conf';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UserService } from '../services/user.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { ImagesComponent } from '../components/images/images.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageServiceService } from '../services/message-service.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,
    DropdownModule, BoxModule, TabsModule,

  ],
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationComponent,
    ImagesComponent,
    TopStreamsComponent,
    ChatComponent,
    MessageComponent,

  ],
  exports: [
    StreamsComponent,
    ToolbarComponent,
  ],
  providers: [
    TokenService,
    PostService,
    UserService,
    MessageServiceService
  ]
})
export class StreamsModule { }
