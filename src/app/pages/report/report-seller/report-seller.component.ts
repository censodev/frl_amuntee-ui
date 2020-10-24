import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'app/@core/services/statistic.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-report-seller',
  templateUrl: './report-seller.component.html',
  styleUrls: ['./report-seller.component.scss'],
})
export class ReportSellerComponent implements OnInit {
  source = new LocalDataSource;
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      // team: {
      //   title: 'Team',
      //   type: 'string',
      // },
      orderCount: {
        title: 'Orders',
        type: 'number',
      },
      productQuantity: {
        title: 'Product Quantity',
        type: 'number',
      },
      revenue: {
        title: 'Revenue',
        type: 'number',
      },
      marketingFee: {
        title: 'Marketing Fee',
        type: 'number',
      },
      baseCostFee: {
        title: 'Base Cost Fee',
        type: 'number',
      },
      storeFee: {
        title: 'Store Fee',
        type: 'number',
      },
      netProfit: {
        title: 'Net Profit',
        type: 'number',
      },
      bonusSale: {
        title: 'Bonus Sale',
        type: 'number',
      },
      bonusProfit: {
        title: 'Bonus Profit',
        type: 'number',
      },
      sharedProfit: {
        title: 'Profit Shared',
        type: 'number',
      },
    },
  };
  constructor(private statisticService: StatisticService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const sellerCode = this.authService.isAdmin() ? null : this.authService.getCode();
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statisticForSeller(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => {
          this.source.load(res.filter(i => isNaN(i.name))
            .reduce((acc, cur) => {
              if (acc.some(i => i.name === cur.name)) {
                const target = acc.find(i => i.name === cur.name);
                const newAcc = acc.filter(i => i.name !== cur.name);
                return [
                  ...newAcc,
                  {
                    name: target.name,
                    orderCount: target.orderCount + cur.orderCount,
                    productQuantity: target.productQuantity + cur.productQuantity,
                    revenue: Math.round((target.revenue + cur.revenue) * 100) / 100.00,
                    marketingFee: Math.round((target.marketingFee + cur.marketingFee) * 100) / 100.00,
                    baseCostFee: Math.round((target.baseCostFee + cur.baseCostFee) * 100) / 100.00,
                    storeFee: Math.round((target.storeFee + cur.storeFee) * 100) / 100.00,
                    netProfit: Math.round((target.netProfit + cur.netProfit) * 100) / 100.00,
                    bonusSale: Math.round((target.bonusSale + cur.bonusSale) * 100) / 100.00,
                    bonusProfit: Math.round((target.bonusProfit + cur.bonusProfit) * 100) / 100.00,
                    sharedProfit: Math.round((target.sharedProfit + cur.sharedProfit) * 100) / 100.00,
                  },
                ];
              }
              return [...acc, cur];
            }, []));
        });
    });
  }

}
