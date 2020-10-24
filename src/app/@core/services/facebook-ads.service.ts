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
    const token = 'EAAmE2N4smZAEBAAnL0uYWCM3Nslxfx5KOZAsi2z0VOT2PbcQrEVpVvuzZCs8mZBjHjyRUJXw0yATrvN3eWguI85wLwGMZBNQl4DLILQnlihxAHSCkJzrCEcPYQLvVOmuL0wDRFAZCvMsP9EUMvvp2JqFymWOiGY6pFk6YErWCZC8Q5YJBvzhOJYsS7TtXQJZBorhSrMMKUg21gZDZD';
    const url = 'https://graph.facebook.com/v8.0/me?fields=adaccounts.limit(100){id,name,account_status,age,amount_spent,spend_cap,balance,currency,campaigns.limit(1000),adsets.limit(1000),is_prepay_account}';
    return this.http.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
  }

  getAccoutStatusDictionary() {
    return AD_ACCOUT_STATUS;
  }
}
