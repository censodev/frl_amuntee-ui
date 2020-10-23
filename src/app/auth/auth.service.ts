import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  login(code: string, password: string): Observable<any> {
    const rq = { username: code, password: password };
    return this.http.post(`${environment.apiUrl}/auth/login`, rq)
      .pipe(
        tap(res => {
          this.cookieService.set('token', res.token);
          this.cookieService.set('fullname', res.user.fullname);
          this.cookieService.set('code', res.user.code);
          this.cookieService.set('authorities', res.user.authorities);
        }, err => {
          // tslint:disable-next-line: no-console
          console.log(err);
        }),
      );
  }

  logout(): Observable<boolean> {
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/pages');
    return of(true);
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.cookieService.get('token') ? true : false);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getRole(): string {
    return this.cookieService.get('authorities');
  }

  getFullname(): string {
    return this.cookieService.get('fullname');
  }

  getCode(): string {
    return this.cookieService.get('code');
  }

  requestPassword(email: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email);
    return this.http
      .post<any>(`${environment.apiUrl}/auth/request-password`, {}, { params: params });
  }

  resetPassword(code: string, password: string, confirmPassword, resetCode: string): Observable<any> {
    const body = {
      code: code,
      password: password,
      confirmPassword: confirmPassword,
      resetCode: resetCode,
    };
    return this.http.post<any>(`${environment.apiUrl}/auth/reset-password`, body);
  }

  isAdmin() {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
