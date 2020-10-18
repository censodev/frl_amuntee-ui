import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'app/@core/services/statistic.service';
import { AuthService } from 'app/auth/auth.service';
import { LocalDataSource } from 'ng2-smart-table';
import { cursorTo } from 'readline';

@Component({
  selector: 'ngx-report-supplier',
  templateUrl: './report-supplier.component.html',
  styleUrls: ['./report-supplier.component.scss'],
})
export class ReportSupplierComponent implements OnInit {
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
      nbr: {
        title: 'Nbr',
        type: 'number',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
      orderId: {
        title: 'Order ID',
        type: 'string',
      },
      productName: {
        title: 'Product Name',
        type: 'string',
      },
      quantity: {
        title: 'Product Quantity',
        type: 'number',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      baseCost: {
        title: 'Base Cost',
        type: 'number',
      },
      supplierName: {
        title: 'Supplier',
        type: 'string',
      },
      sku: {
        title: 'SKU',
        type: 'string',
      },
    },
  };
  constructor(private statisticService: StatisticService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const sellerCode = this.authService.isAdmin() ? null : this.authService.getCode();
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.statisticForSupplier(data.from, data.to, data.storeId, sellerCode)
        .subscribe((res: any[]) => {
          this.source.load(res.map((cur, i) => {
            const date = new Date(cur.date);
            return {
              ...cur,
              nbr: i + 1,
              date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`,
            };
          }));
        });
    });
  }

}
