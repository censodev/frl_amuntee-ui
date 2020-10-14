import { ProductType } from './../models/business/product-type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/business/product';
import { Pageable } from '../models/pageable';

const BASE_URL = `${environment.apiUrl}/product`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  listProducts(limit: number = 10,
              page: number = 0,
              orderBy: string = 'id',
              order: string = 'desc'): Observable<Pageable<Product>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Product>>(`${BASE_URL}`, { params: params });
  }

  findOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/${product.id}`, product);
  }

  listTypes(limit: number = 100,
            page: number = 0,
            orderBy: string = 'id',
            order: string = 'desc'): Observable<Pageable<ProductType>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<ProductType>>(`${BASE_URL}/type`, { params: params });
  }
}
