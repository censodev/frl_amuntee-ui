import { AuthService } from './../../auth/auth.service';
import { StatisticService } from './../../@core/services/statistic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profitCompany = undefined;

  statistic = {
    summary: undefined,
    fee: undefined,
    productType: undefined,
    seller: undefined,
    productDesign: undefined,
    supplier: undefined,
  };

  constructor(private statisticService: StatisticService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const sellerCode = this.authService.isAdmin() ? null : this.authService.getCode();
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statistic(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => {
          res = res.filter(stat => stat.year && stat.month);
          this.callbackStatisticSummary(res);
          if (this.authService.isAdmin()) {
            this.statisticService.statisticForSeller(data.from, data.to, data.storeId, sellerCode)
              .subscribe((res2: any[]) => {
                res2 = res2.filter(i => i.name && isNaN(i.name));
                this.callbackStatisticSeller(res2);
                this.statisticService.statisticForDispute(data.from, data.to, data.storeId, sellerCode)
                  .subscribe((res3: any[]) => {
                    this.profitCompany = this.calcCompanyProfit(res, res2, res3);
                  });
              });
          }
        });

      this.statisticService.statisticForProductType(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => this.callbackStatisticProductType(res));
      this.statisticService.statisticForProductDesign(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => this.callbackStatisticProductDesign(res));

      if (this.authService.isAdmin()) {
        this.statisticService.statisticForSupplier(data.from, data.to, data.storeId, sellerCode)
          .subscribe((res: any[]) => this.callbackStatisticSupplier(res));
      }
    });
  }

  callbackStatisticSummary(data: any[]) {
    const chartData = data
      .reduce((acc, cur: any) => {
        const revenue = cur.revenue;
        const fee =  Math.round((cur.marketingFee + cur.storeFee + cur.baseCostFee) * 100) / 100.00;
        const profit = Math.round((revenue - fee) * 100) / 100.00;
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

    this.statistic.summary = {
      chartData: chartData,
      totalSales: Math.round(data.reduce((acc, cur: any) => acc + cur.revenue, 0) * 100) / 100.00,
    };

    this.statistic.fee = data
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
    this.statistic.productType = data
      .reduce((acc, cur: any) => {
        return {
          legends: [...acc.legends, cur.productCode],
          data: [
            ...acc.data,
            {
              name: cur.productCode,
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
    const chartData = data
      .reduce((acc, cur: any) => {
        if (acc.legends.includes(cur.name)) {
          const target = acc.data.find(i => i.name === cur.name);
          const newAcc = acc.data.filter(i => i.name !== cur.name);

          return {
            legends: acc.legends,
            data: [
              ...newAcc,
              {
                name: cur.name,
                value: cur.orderCount + target.value,
              },
            ],
          };
        }
        return {
          legends: [...acc.legends, cur.name],
          data: [
            ...acc.data,
            {
              name: cur.name,
              value: cur.orderCount,
            },
          ],
        };
      }, {
        legends: [],
        data: [],
      });

    this.statistic.seller = {
      chartData: chartData,
      orderCount: data.reduce((acc, cur: any) => acc + cur.orderCount, 0),
    };

  }

  callbackStatisticProductDesign(data: any[]) {
    this.statistic.productDesign = data;
  }

  callbackStatisticSupplier(data: any[]) {
    data = data.filter(i => i.baseCost);
    const chartData = data
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

    this.statistic.supplier = {
      chartData: chartData,
      totalBaseCost: data.reduce((acc, cur: any) => acc + cur.baseCost, 0),
    };

  }

  calcCompanyProfit(summary: any[], sellers: any[], disputes: any[]) {
    return summary.reduce((accSummary, curSummary) => {
      // summary
      const revenue = curSummary.revenue;
      const fee =  Math.round((curSummary.marketingFee + curSummary.storeFee + curSummary.baseCostFee) * 100) / 100.00;
      const totalProfit = Math.round((revenue - fee) * 100) / 100.00;
      // seller
      const sellerProfit = sellers.filter(seller => {
        return seller.year === curSummary.year
            && seller.month === curSummary.month
            && seller.day === curSummary.day;
      }).map(i => i.sharedProfit).reduce((acc, cur) => acc + cur, 0);
      // dispute
      const dispute = disputes.filter(dis => {
        return dis.year === curSummary.year
            && dis.month === curSummary.month
            && dis.day === curSummary.day;
      }).map(i => i.dispute).reduce((acc, cur) => acc + cur, 0);
      return {
        data: [
          [...accSummary.data[0], totalProfit],
          [...accSummary.data[1], sellerProfit],
          [...accSummary.data[2], dispute],
          [...accSummary.data[3], Math.round((totalProfit - sellerProfit - dispute) * 100) / 100.00],
        ],
        chartLabel: [...accSummary.chartLabel, `${curSummary.month}/${curSummary.day}`],
      };
    }, {
      chartLabel: [],
      data: [[], [], [], []],
    });
  }
}
