import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  addPost(body): Observable<any> {
     return this.http.post(`${BASEURL}/add-post`, body);
  }

  addLike(body): Observable<any> {
    return this.http.post(`${BASEURL}/add-like`, body);
 }

  getAllPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
 }

 addComment(postId, comment): Observable<any> {
  return this.http.post(`${BASEURL}/add-comment`, {postId, comment});
 }

  getPosts(postId): Observable<any> {
    return this.http.get(`${BASEURL}/post/${postId}`);
 }




}
