import { Order } from '../models/business/order';
import { Pageable } from '../models/pageable';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const BASE_URL = `${environment.apiUrl}/revenue`;

@Injectable({
  providedIn: 'root',
})
export class RevenueService {

  constructor(private http: HttpClient) { }

  listOrder(limit: number = 10,
            page: number = 0,
            orderBy: string = 'code',
            order: string = 'desc'): Observable<Pageable<Order>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Order>>(`${BASE_URL}/order`, { params: params });
  }

  statistic() {
    return this.http.get(`${BASE_URL}/statistic`);
  }
}
