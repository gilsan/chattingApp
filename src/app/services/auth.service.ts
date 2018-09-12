import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const BASEURL = 'http://localhost:3000/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(body): Observable<any>  {
    return this.http.post(`${BASEURL}/register`, body);
  }

  login(body): Observable<any>  {
    return this.http.post(`${BASEURL}/login`, body);
  }

}
