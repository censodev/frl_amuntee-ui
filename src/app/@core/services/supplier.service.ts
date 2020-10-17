import { Supplier } from './../models/business/supplier';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable';
import { environment } from 'environments/environment';

const BASE_URL = `${environment.apiUrl}/supplier`;

@Injectable({
  providedIn: 'root',
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  list(limit: number = 100,
        page: number = 0,
        orderBy: string = 'id',
        order: string = 'desc'): Observable<Pageable<Supplier>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Supplier>>(`${BASE_URL}`, { params: params });
  }

  add(spl: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${BASE_URL}`, spl);
  }

  update(spl: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${BASE_URL}/${spl.id}`, spl);
  }
}
