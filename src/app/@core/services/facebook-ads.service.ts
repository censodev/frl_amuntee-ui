import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AD_ACCOUT_STATUS = [
  { id: 1, title: 'ACTIVE' },
  { id: 2, title: 'DISABLED' },
];

@Injectable({
  providedIn: 'root',
})
export class FacebookAdsService {

  constructor(private http: HttpClient) { }

  fetchAccounts() {
    return this.http.get<any[]>(`${environment.apiUrl}/facebook/adaccounts`);
  }

  getAccoutStatusDictionary() {
    return AD_ACCOUT_STATUS;
  }
}
