import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'app/@core/services/statistic.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'ngx-report-total-sales',
  templateUrl: './report-total-sales.component.html',
  styleUrls: ['./report-total-sales.component.scss'],
})
export class ReportTotalSalesComponent implements OnInit {
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
      date: {
        title: 'Date',
        type: 'string',
      },
      orderCount: {
        title: 'Orders',
        type: 'number',
      },
      revenue: {
        title: 'Revenue',
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
      marketingFee: {
        title: 'Marketing Fee',
        type: 'number',
      },
    },
  };

  constructor(private statisticService: StatisticService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const sellerCode = this.authService.isAdmin() ? null : this.authService.getCode();
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statistic(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => {
          this.source.load(res.map((cur, i) => {
            return {
              date: `${cur.year}/${cur.month}/${cur.day}`,
              orderCount: cur.orderCount,
              revenue: cur.revenue,
              storeFee: cur.storeFee,
              baseCostFee: cur.baseCostFee,
              marketingFee: cur.marketingFee,
            };
          }));
        });
    });
  }

}
