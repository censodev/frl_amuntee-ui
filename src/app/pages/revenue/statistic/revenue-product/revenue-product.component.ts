import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-revenue-product',
  templateUrl: './revenue-product.component.html',
  styleUrls: ['./revenue-product.component.scss'],
})
export class RevenueProductComponent implements OnInit {
  @Input()
  sourceProductSku: LocalDataSource;
  @Input()
  sourceProductCode: LocalDataSource;
  @Input()
  sourceProductDesign: LocalDataSource;

  settingsProductSku = {
    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      year: {
        title: 'Year',
        type: 'string',
      },
      month: {
        title: 'Month',
        type: 'string',
      },
      title: {
        title: 'Product SKU',
        type: 'string',
      },
      quantity: {
        title: 'Products Quantity',
        type: 'number',
      },
      revenue: {
        title: 'Revenue',
        type: 'number',
      },
      storeFee: {
        title: 'Store Fee',
        type: 'number',
      },
    },
  };

  settingsProductCode: any;
  settingsProductDesign: any;

  constructor() { }

  ngOnInit(): void {
    this.settingsProductCode = {
      ...this.settingsProductSku,
      columns: {
        ...this.settingsProductSku.columns,
        title: {
          ...this.settingsProductSku.columns.title,
          title: 'Product Code',
        },
      },
    };
    this.settingsProductDesign = {
      ...this.settingsProductSku,
      columns: {
        ...this.settingsProductSku.columns,
        title: {
          ...this.settingsProductSku.columns.title,
          title: 'Product Design',
        },
      },
    };
  }
}
