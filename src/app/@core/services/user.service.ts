import { environment } from 'environments/environment';
import { Pageable } from './../models/pageable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const BASE_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  roles() {
    return [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'SELLER' },
    ];
  }

  list(limit: number = 10,
      page: number = 0,
      orderBy: string = 'id',
      order: string = 'desc'): Observable<Pageable<User>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<User>>(`${BASE_URL}`, { params: params });
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${BASE_URL}/${user.id}`, user);
  }

  find(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${id}`);
  }
}
