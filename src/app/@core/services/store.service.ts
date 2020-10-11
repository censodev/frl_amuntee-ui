import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Store } from '../models/business/store';
import { Pageable } from '../models/pageable';

const BASE_URL = `${environment.apiUrl}/store`;

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(private http: HttpClient) { }

  listStores(limit: number = 10,
            page: number = 0,
            orderBy: string = 'id',
            order: string = 'desc'): Observable<Pageable<Store>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Store>>(`${BASE_URL}`, { params: params });
  }

  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${BASE_URL}`, store);
  }
}
