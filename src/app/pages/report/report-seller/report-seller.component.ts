import { UtilService } from './../../../@core/services/util.service';
import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'app/@core/services/statistic.service';

@Component({
  selector: 'ngx-report-seller',
  templateUrl: './report-seller.component.html',
  styleUrls: ['./report-seller.component.scss'],
})
export class ReportSellerComponent implements OnInit {
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
              private authService: AuthService,
              private util: UtilService) { }

  ngOnInit(): void {
    const sellerCode = this.authService.isAdmin() ? null : this.authService.getCode();
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statisticForSeller(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => {
          this.source = res.filter(i => isNaN(i.name))
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
                    revenue: this.util.formatCurrency(target.revenue + cur.revenue),
                    marketingFee: this.util.formatCurrency(target.marketingFee + cur.marketingFee),
                    baseCostFee: this.util.formatCurrency(target.baseCostFee + cur.baseCostFee),
                    storeFee: this.util.formatCurrency(target.storeFee + cur.storeFee),
                    netProfit: this.util.formatCurrency(target.netProfit + cur.netProfit),
                    bonusSale: this.util.formatCurrency(target.bonusSale + cur.bonusSale),
                    bonusProfit: this.util.formatCurrency(target.bonusProfit + cur.bonusProfit),
                    sharedProfit: this.util.formatCurrency(target.sharedProfit + cur.sharedProfit),
                  },
                ];
              }
              return [
                ...acc,
                {
                  name: cur.name,
                  orderCount: cur.orderCount,
                  productQuantity: cur.productQuantity,
                  revenue: this.util.formatCurrency(cur.revenue),
                  marketingFee: this.util.formatCurrency(cur.marketingFee),
                  baseCostFee: this.util.formatCurrency(cur.baseCostFee),
                  storeFee: this.util.formatCurrency(cur.storeFee),
                  netProfit: this.util.formatCurrency(cur.netProfit),
                  bonusSale: this.util.formatCurrency(cur.bonusSale),
                  bonusProfit: this.util.formatCurrency(cur.bonusProfit),
                  sharedProfit: this.util.formatCurrency(cur.sharedProfit),
                }];
            }, []);
        });
    });
  }

}
