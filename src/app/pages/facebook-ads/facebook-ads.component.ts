import { FacebookAdsService } from './../../@core/services/facebook-ads.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.scss'],
})
export class FacebookAdsComponent implements OnInit {
  source = new LocalDataSource();
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    rowClassFunction: row => {
      switch (row.data.account_status) {
        case 'ACTIVE':
          return 'acc-status-active';
        case 'DISABLED':
          return 'acc-status-disabled';
      }
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      account_status: {
        title: 'Status',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
      amount_spent: {
        title: 'Amount Spent',
        type: 'number',
      },
      spend_cap: {
        title: 'Spend Cap',
        type: 'number',
      },
      balance: {
        title: 'Balance',
        type: 'number',
      },
      currency: {
        title: 'Balance',
        type: 'string',
      },
      adsets: {
        title: 'AD Set',
        type: 'number',
      },
      campaigns: {
        title: 'Camps',
        type: 'number',
      },
      is_prepay_account: {
        title: 'Pre Pay',
        type: 'boolean',
      },
    },
  };

  constructor(private facebookAdsService: FacebookAdsService) { }

  ngOnInit(): void {
    this.facebookAdsService.fetchAccounts().subscribe(
      (res: any) => {
        const data = res.adaccounts.data;
        // console.log(data);
        this.source.load(data.map(item => {
          return {
            ...item,
            id: item.id.replace(/act_/, ''),
            age: Math.round(item.age),
            account_status: this.facebookAdsService
              .getAccoutStatusDictionary()
              .find(i => i.id === item.account_status).title,
            adsets: item.adsets.data.length,
            campaigns: item.campaigns.data.length,
          };
        }));
      },
      err => console.error(err),
      );
  }

}
