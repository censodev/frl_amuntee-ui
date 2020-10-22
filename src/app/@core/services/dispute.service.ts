import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Dispute } from '../models/business/dispute';
import { Pageable } from '../models/pageable';

const BASE_URL = `${environment.apiUrl}/dispute`;

@Injectable({
  providedIn: 'root',
})
export class DisputeService {

  constructor(private http: HttpClient) { }

  list(limit: number = 100,
        page: number = 0,
        orderBy: string = 'id',
        order: string = 'desc'): Observable<Pageable<Dispute>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Dispute>>(`${BASE_URL}`, { params: params });
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  }
}
