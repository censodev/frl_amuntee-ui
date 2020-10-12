import { Store } from './../../@core/models/business/store';
import { StoreService } from './../../@core/services/store.service';
import { StatisticService } from './../../@core/services/statistic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  statistic = {
    summary: undefined,
    fee: undefined,
  };

  stores: Store[];

  constructor(private statisticService: StatisticService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.listStores()
      .subscribe(res => this.callbackStoreList(res.content));
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statistic(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => this.callbackStatisticSummary(res));
    });
  }

  callbackStoreList(data) {
    this.stores = data;
  }

  callbackStatisticSummary(data: any[]) {
    this.statistic.summary = data
      .filter(stat => stat.year && stat.month)
      .reduce((acc, cur: any) => {
        const revenue = cur.revenue;
        const fee = cur.marketingFee + cur.storeFee + cur.baseCostFee;
        const profit = revenue - fee;
        return {
          data: [
            [...acc.data[0], revenue],
            [...acc.data[1], fee],
            [...acc.data[2], profit],
          ],
          chartLabel: [...acc.chartLabel, `${cur.year}/${cur.month}`],
        };
      }, {
        chartLabel: [],
        data: [[], [], []],
      });
    this.statistic.fee = data
      .filter(stat => stat.year && stat.month)
      .reduce((acc, cur: any) => {
        return {
          data: [
            [...acc.data[0], cur.baseCostFee],
            [...acc.data[1], cur.storeFee],
            [...acc.data[2], cur.marketingFee],
          ],
          chartLabel: [...acc.chartLabel, `${cur.year}/${cur.month}`],
        };
      }, {
        chartLabel: [],
        data: [[], [], []],
      });
  }
}
