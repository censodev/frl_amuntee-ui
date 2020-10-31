import { FacebookAdsService } from './../../@core/services/facebook-ads.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.scss'],
})
export class FacebookAdsComponent implements OnInit {
  source: any[];
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
        title: 'Currency',
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
      business_name: {
        title: 'Business',
        type: 'string',
      },
      business_id: {
        title: 'Business ID',
        type: 'string',
      },
    },
  };

  constructor(private facebookAdsService: FacebookAdsService) { }

  ngOnInit(): void {
    this.facebookAdsService.fetchAccounts().subscribe(
      res => {
        this.source = res.map(item => {
          return {
            ...item,
            id: item.id.replace(/act_/, ''),
            age: Math.round(item.age),
            account_status: this.facebookAdsService
              .getAccoutStatusDictionary()
              .find(i => i.id === item.account_status).title,
            adsets: item.adsets?.data.length,
            campaigns: item.campaigns?.data.length,
            business_id: item.business?.id,
            business_name: item.business?.name,
          };
        });
      },
      err => console.error(err),
      );
  }

}
