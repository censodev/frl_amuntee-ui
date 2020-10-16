import { LocalDataSource } from 'ng2-smart-table';
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
    productType: undefined,
    seller: undefined,
    productDesign: undefined,
    supplier: undefined,
  };

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statistic(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => this.callbackStatisticSummary(res));
      this.statisticService.statisticForProductType(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => this.callbackStatisticProductType(res));
      this.statisticService.statisticForSeller(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => this.callbackStatisticSeller(res));
      this.statisticService.statisticForProductDesign(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => this.callbackStatisticProductDesign(res));
      this.statisticService.statisticForSupplier(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => this.callbackStatisticSupplier(res));
    });
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
          chartLabel: [...acc.chartLabel, `${cur.month}/${cur.day}`],
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
          chartLabel: [...acc.chartLabel, `${cur.month}/${cur.day}`],
        };
      }, {
        chartLabel: [],
        data: [[], [], []],
      });
  }

  callbackStatisticProductType(data: any[]) {
    this.statistic.productType = data.reduce((acc, cur: any) => {
      return {
        legends: [...acc.legends, cur.title ? cur.title : 'Undefined'],
        data: [
          ...acc.data,
          {
            name: cur.title ? cur.title : 'Undefined',
            value: cur.orderCount,
          },
        ],
      };
    }, {
      legends: [],
      data: [],
    });
  }

  callbackStatisticSeller(data: any[]) {
    this.statistic.seller = data.reduce((acc, cur: any) => {
      return {
        legends: [...acc.legends, cur.name ? cur.name : 'Undefined'],
        data: [
          ...acc.data,
          {
            name: cur.name ? cur.name : 'Undefined',
            value: cur.orderCount,
          },
        ],
      };
    }, {
      legends: [],
      data: [],
    });
  }

  callbackStatisticProductDesign(data: any[]) {
    this.statistic.productDesign = data;
  }

  callbackStatisticSupplier(data: any[]) {
    this.statistic.supplier = data
      .filter(i => i.baseCost)
      .reduce((acc, cur: any) => {
        const curSplName = cur.supplierName ? cur.supplierName : 'Undefined';
        if (acc.legends.includes(curSplName)) {
          const target = acc.data.find(i => i.name === curSplName);
          const newAcc = acc.data.filter(i => i.name !== curSplName);

          return {
            legends: acc.legends,
            data: [
              ...newAcc,
              {
                name: curSplName,
                value: +cur.baseCost + target.value,
              },
            ],
          };
        }
        return {
          legends: [...acc.legends, curSplName],
          data: [
            ...acc.data,
            {
              name: curSplName,
              value: +cur.baseCost,
            },
          ],
        };
      }, {
        legends: [],
        data: [],
      });
  }
}
