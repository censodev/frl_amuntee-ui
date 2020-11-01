import { FacebookAdsService } from './../../@core/services/facebook-ads.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.scss'],
})
export class FacebookAdsComponent implements OnInit {
  summary: any[];
  source: any[];
  settings = {
    mode: 'external',
    hideSubHeader: true,
    pager: { display: false },
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    rowClassFunction: row => {
      switch (row.data.status) {
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
      status: {
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
      funding: {
        title: 'Funding',
        type: 'string',
      },
      business_id: {
        title: 'Business ID',
        type: 'string',
      },
      business_name: {
        title: 'Business',
        type: 'string',
      },
    },
  };

  constructor(private facebookAdsService: FacebookAdsService) { }

  ngOnInit(): void {
    this.facebookAdsService.fetchAccounts().subscribe(
      res => {
        this.source = res
          .reduce((acc, cur) => {
            return [
              ...acc,
              ...cur.data.map(item => {
                return {
                  ...item,
                  id: item.id.replace(/act_/, ''),
                  age: Math.round(item.age),
                  status: this.facebookAdsService
                    .getAccountStatusDictionary()
                    .find(i => i.id === item.account_status)?.title,
                  adsets: item.adsets?.data.length || 0,
                  campaigns: item.campaigns?.data.length || 0,
                  business_id: item.business?.id,
                  business_name: item.business?.name,
                  funding: item.funding_source_details?.display_string,
                };
              }),
            ];
          }, [])
          .sort((a, b) => {
            return a.account_status < b.account_status ? 1 : -1;
          });
        this.summary = this.facebookAdsService
          .getAccountStatusDictionary().map(item => {
            return {
              title: item.title,
              data: `${this.source.filter(i => i.account_status === item.id).length || 0}/${this.source.length}`,
            };
          });
      },
      err => console.error(err),
      );
  }

}
