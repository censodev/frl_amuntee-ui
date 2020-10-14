import { TimeService } from './time.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const BASE_URL = `${environment.apiUrl}/statistic`;

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  constructor(private http: HttpClient,
              private timeService: TimeService) { }

  onFiltered = new BehaviorSubject({
    storeId: 0,
    from: this.timeService.today().from,
    to: this.timeService.today().to,
  });

  statistic(from: Date, to: Date, storeId: number) {
    const params = new HttpParams()
      .set('from', from ? '' + from.getTime() : '')
      .set('to', to ? '' + to.getTime() : '')
      .set('storeId', storeId && storeId !== 0 ? storeId.toString() : '');
    return this.http.get(`${BASE_URL}`, { params: params });
  }

  statisticForSeller() {
    return this.http.get(`${BASE_URL}/seller`);
  }

  statisticForSupplier() {
    return this.http.get(`${BASE_URL}/supplier`);
  }

  statisticForProductSku() {
    return this.http.get(`${BASE_URL}/product-sku`);
  }

  statisticForProductCode() {
    return this.http.get(`${BASE_URL}/product-code`);
  }

  statisticForProductDesign() {
    return this.http.get(`${BASE_URL}/product-design`);
  }
}
