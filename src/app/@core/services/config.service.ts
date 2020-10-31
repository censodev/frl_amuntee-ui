import { Config } from './../models/business/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable';
import { environment } from 'environments/environment';

const BASE_URL = `${environment.apiUrl}/config`;

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  list(limit: number = 100,
    page: number = 0,
    orderBy: string = 'id',
    order: string = 'desc'): Observable<Pageable<Config>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Config>>(`${BASE_URL}`, { params: params });
  }

  add(data: Config): Observable<Config> {
    return this.http.post<Config>(`${BASE_URL}`, data);
  }

  update(data: Config): Observable<Config> {
    return this.http.put<Config>(`${BASE_URL}/${data.id}`, data);
  }
}
