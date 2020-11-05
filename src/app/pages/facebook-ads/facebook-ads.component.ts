import { AuthService } from './../../auth/auth.service';
import { FacebookAdsService } from './../../@core/services/facebook-ads.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ngx-facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacebookAdsComponent implements OnInit {
  selectorStatus: any[];
  selectedStatus = 9999;
  limitMiniDashboard = 2;
  miniDashboard: any[];
  source: any[];
  displaySource: any[];
  columnsToDisplay = ['arrow', 'id', 'name', 'status', 'age', 'amount_spent', 'spend_cap', 'balance', 'currency', 'adsets', 'campaigns_count', 'is_prepay_account', 'funding', 'business_id', 'business_name'];
  headers = ['', 'ID', 'Name', 'Status', 'Age', 'Amount Spent', 'Spend Cap', 'Balance', 'Currency', 'AD Set', 'Camps', 'Prepay', 'Funding', 'Business ID', 'Business'];
  childColumnsToDisplay = ['id', 'name', 'status', 'spend', 'date_start', 'date_stop'];

  constructor(private facebookAdsService: FacebookAdsService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.selectorStatus = [
      { id: this.selectedStatus, title: 'ALL' },
      ...this.facebookAdsService.getAccountStatusDictionary(),
    ];
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
                  campaigns_count: item.campaigns?.data.length || 0,
                  business_id: item.business?.id,
                  business_name: item.business?.name,
                  funding: item.funding_source_details?.display_string,
                };
              }),
            ];
          }, []);
        this.onFiltered();
        this.miniDashboard = this.facebookAdsService.getAccountStatusDictionary()
          .map(item => {
            return {
              title: item.title,
              data: `${this.source.filter(i => i.account_status === item.id).length || 0}/${this.source.length}`,
            };
          });
      },
      err => console.error(err),
      );
  }

  loadMoreMiniDashboard() {
    this.limitMiniDashboard = this.facebookAdsService.getAccountStatusDictionary().length;
  }

  onFiltered() {
    if (this.facebookAdsService.getAccountStatusDictionary().some(i => i.id === this.selectedStatus)) {
      this.displaySource = this.source.filter(i => i.account_status === this.selectedStatus);
    } else {
      this.displaySource = this.source.sort((a, b) => {
        return a.account_status < b.account_status ? 1 : -1;
      });
    }
    if (!this.authService.isAdmin()) {
      this.displaySource = this.displaySource
        .filter(acc => {
          return acc.campaigns?.data.some(camp => {
            return this.getUserCodeFromCamp(camp) === this.authService.getCode();
          });
        });
      this.displaySource.forEach(acc => {
        acc.campaigns.data = acc.campaigns.data
          .filter(camp => this.getUserCodeFromCamp(camp) === this.authService.getCode());
      });
    }
    // console.log(this.displaySource)
  }

  getUserCodeFromCamp(camp) {
    return camp.name?.split('-')[2]?.trim().substring(0, 2);
  }
}
