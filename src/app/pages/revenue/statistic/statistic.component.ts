import { RevenueService } from './../../../@core/services/revenue.service';
import { OrdersProfitChartService } from './../../../@core/mock/orders-profit-chart.service';
import { Component, OnInit } from '@angular/core';
import { ProfitChart } from 'app/@core/data/profit-chart';

@Component({
  selector: 'ngx-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  revenueCompanyData: ProfitChart;

  constructor(private revenueService: RevenueService) { }

  ngOnInit(): void {
    this.revenueService.statistic()
      .subscribe((data: any[]) => {
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
        console.log(this.revenueCompanyData);
      });
  }

}
