import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-revenue-seller',
  templateUrl: './revenue-seller.component.html',
  styleUrls: ['./revenue-seller.component.scss'],
})
export class RevenueSellerComponent implements OnInit {
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
        title: 'Seller Code',
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
