import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const token = this.tokenService.GetToken();
      if (token) {
        headersConfig['Authorization'] = `bearer ${token}`;
      }
      const _req = req.clone({setHeaders: headersConfig});
      return next.handle(_req)
      .pipe(  // JWT의 토큰에 설치한 후, 시간이 경과한 경우
        tap( (event: HttpEvent<any>) => {},
       err => {  // localStorage에서 토큰 삭제후, login으로 변경
         if ( err instanceof HttpErrorResponse ) {
          if ( err.status === 401) {
             this.tokenService.DeleteToken();
             this.router.navigate(['/login']);
          }
         }
       })
      );
  }

}
