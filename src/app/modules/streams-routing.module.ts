import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { ImagesComponent } from '../components/images/images.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangepasswordComponent } from '../components/changepassword/changepassword.component';

const routes: Routes = [

  { path: 'streams', component: StreamsComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'post/:id', component: CommentsComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'people', component: PeopleComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'people/following', component: FollowingComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'people/followers', component: FollowersComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'notification', component: NotificationComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'images/:name', component: ImagesComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'chat/:name', component: ChatComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: 'account/password', component: ChangepasswordComponent,
    canActivate: [ AuthGuard ]
 },
 {  path: ':name', component: ViewUserComponent,
    canActivate: [ AuthGuard ]
 },
 {
    path: '**',
    redirectTo: 'streams'
 }
];

@NgModule({
  imports: [

    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
