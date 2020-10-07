import { Component, OnInit } from '@angular/core';
import { ProfitChart } from 'app/@core/data/profit-chart';
import { RevenueService } from 'app/@core/services/revenue.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  revenueCompanyData: ProfitChart;

  constructor(private revenueService: RevenueService) {

  }

  ngOnInit(): void {
    this.revenueService.statistic()
      .subscribe((data: any[]) => this.callbackStatSummary(data));
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

}
