import { Component, OnInit } from '@angular/core';
import { ProfitChart } from 'app/@core/data/profit-chart';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {

  revenueCompanyData: ProfitChart;

  constructor() {

  }

  ngOnInit(): void {

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
