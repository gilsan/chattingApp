import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  GetAllUsers(): Observable<any> {
    return  this.http.get(`${BASEURL}/users`);
  }

  GetUserById(id): Observable<any> {
    return  this.http.get(`${BASEURL}/user/${id}`);
  }

  GetUserByName(name): Observable<any> {
    return  this.http.get(`${BASEURL}/username/${name}`);
  }

  FollowUser(userFollowed): Observable<any> {
    return  this.http.post(`${BASEURL}/follow-user`, { userFollowed  } );
  }

  UnFollowUser(userFollowed): Observable<any> {
    return  this.http.post(`${BASEURL}/unfollow-user`, { userFollowed  } );
  }

  MarkNotification (id, deleteValue?): Observable<any> {
    return  this.http.post(`${BASEURL}/mark/${id}`, { id, deleteValue  } );
  }

  MarkAllAsRead(): Observable<any> {
    return this.http.post(`${BASEURL}/mark-all`, { all: true});
  }

  FollowerUser(userFollowed): Observable<any> {
    return  this.http.post(`${BASEURL}/follower-user`, { userFollowed  } );
  }



}
