import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AD_ACCOUT_STATUS = [
  { id: 1, title: 'ACTIVE' },
  { id: 2, title: 'DISABLED' },
  { id: 3, title: 'UNSETTLED' },
  { id: 7, title: 'PENDING_RISK_REVIEW' },
  { id: 8, title: 'PENDING_SETTLEMENT' },
  { id: 9, title: 'IN_GRACE_PERIOD' },
  { id: 100, title: 'PENDING_CLOSURE' },
  { id: 101, title: 'CLOSED' },
  { id: 201, title: 'ANY_ACTIVE' },
  { id: 202, title: 'ANY_CLOSED' },
];

@Injectable({
  providedIn: 'root',
})
export class FacebookAdsService {

  constructor(private http: HttpClient) { }

  fetchAccounts() {
    return this.http.get<any[]>(`${environment.apiUrl}/facebook/adaccounts`);
  }

  getAccountStatusDictionary() {
    return AD_ACCOUT_STATUS;
  }
}
