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

  statistic(from: Date, to: Date, storeId: number, sellerCode: string) {
    const params = this.getHttpParamsStatistic(from, to, storeId, sellerCode);
    return this.http.get(`${BASE_URL}`, { params: params });
  }

  statisticForSeller(from: Date, to: Date, storeId: number, sellerCode: string) {
    const params = this.getHttpParamsStatistic(from, to, storeId, sellerCode);
    return this.http.get(`${BASE_URL}/seller`, { params: params });
  }

  statisticForSupplier(from: Date, to: Date, storeId: number, sellerCode: string) {
    const params = this.getHttpParamsStatistic(from, to, storeId, sellerCode);
    return this.http.get(`${BASE_URL}/supplier`, { params: params });
  }

  statisticForProductType(from: Date, to: Date, storeId: number, sellerCode: string) {
    const params = this.getHttpParamsStatistic(from, to, storeId, sellerCode);
    return this.http.get(`${BASE_URL}/product-type`, { params: params });
  }

  statisticForProductDesign(from: Date, to: Date, storeId: number, sellerCode: string) {
    const params = this.getHttpParamsStatistic(from, to, storeId, sellerCode);
    return this.http.get(`${BASE_URL}/product-design`, { params: params });
  }

  private getHttpParamsStatistic(from: Date, to: Date, storeId: number, sellerCode: string): HttpParams {
    return new HttpParams()
      .set('from', from ? '' + from.getTime() : '')
      .set('to', to ? '' + to.getTime() : '')
      .set('storeId', storeId && storeId !== 0 ? storeId.toString() : '')
      .set('sellerCode', sellerCode && sellerCode !== '' ? sellerCode : '');
  }
}
