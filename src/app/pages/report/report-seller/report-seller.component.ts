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
      team: {
        title: 'Team',
        type: 'string',
      },
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
      bonus: {
        title: 'Bonus',
        type: 'number',
      },
      sellerProfit: {
        title: 'Profit',
        type: 'number',
      },
    },
  };
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statisticForSeller(data.from, data.to, data.storeId)
        .subscribe((res: any[]) => {
          this.source.load(res);
        });
    });
  }

}
