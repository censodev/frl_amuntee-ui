import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-revenue-supplier',
  templateUrl: './revenue-supplier.component.html',
  styleUrls: ['./revenue-supplier.component.scss'],
})
export class RevenueSupplierComponent implements OnInit {
  @Input()
  source: LocalDataSource;

  settings = {
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
        title: 'Supplier Code',
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
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
