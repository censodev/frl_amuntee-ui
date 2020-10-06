import { RevenueService } from './../../../@core/services/revenue.service';
import { OrdersProfitChartService } from './../../../@core/mock/orders-profit-chart.service';
import { Component, OnInit } from '@angular/core';
import { ProfitChart } from 'app/@core/data/profit-chart';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  revenueCompanyData: ProfitChart;
  revenueSeller = new LocalDataSource();
  revenueSupplier = new LocalDataSource();
  revenueProductSku = new LocalDataSource();
  revenueProductCode = new LocalDataSource();
  revenueProductDesign = new LocalDataSource();

  constructor(private revenueService: RevenueService) { }

  ngOnInit(): void {
    this.revenueService.statistic()
      .subscribe((data: any[]) => this.callbackStatSummary(data));
    this.revenueService.statisticForSeller()
      .subscribe((data: any[]) => this.callbackSpecificStat(data, this.revenueSeller));
    this.revenueService.statisticForSupplier()
      .subscribe((data: any[]) => this.callbackSpecificStat(data, this.revenueSupplier));
    this.revenueService.statisticForProductSku()
      .subscribe((data: any[]) => this.callbackSpecificStat(data, this.revenueProductSku));
    this.revenueService.statisticForProductCode()
      .subscribe((data: any[]) => this.callbackSpecificStat(data, this.revenueProductCode));
    this.revenueService.statisticForProductDesign()
      .subscribe((data: any[]) => this.callbackSpecificStat(data, this.revenueProductDesign));
  }

  callbackStatSummary(data: any[]) {
    this.revenueCompanyData = data
      .filter(stat => stat.year && stat.month)
      .reduce((acc, cur: any) => {
        return {
          data: [[...acc.data[0], cur.ordersCount], [...acc.data[1], Math.round(cur.totalPrice * 100) / 10000]],
          chartLabel: [...acc.chartLabel, `${cur.year}/${cur.month}`],
        };
      }, {
        chartLabel: [],
        data: [[], []],
      });
  }

  callbackSpecificStat(data: any[], stat: LocalDataSource) {
    data = data.map(i => i.title != null
      ? i : Object.assign(i, { title: 'Others', revenue: Math.round(i.revenue * 100) / 100 }));
    stat.load(data);
    // tslint:disable-next-line: no-console
    console.log(data);
  }

}
