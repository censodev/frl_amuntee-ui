import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-statistic-product-design',
  templateUrl: './statistic-product-design.component.html',
  styleUrls: ['./statistic-product-design.component.scss'],
})
export class StatisticProductDesignComponent implements OnInit, OnChanges {
  @Input() data: any[];
  source: LocalDataSource = new LocalDataSource();
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
      productName: {
        title: 'Product Name',
        type: 'string',
      },
      sku: {
        title: 'Sku',
        type: 'string',
      },
      sellerName: {
        title: 'Seller',
        type: 'string',
      },
      productQuantity: {
        title: 'Quantity',
        type: 'number',
      },
      revenue: {
        title: 'Revenue',
        type: 'number',
      },
    },
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.source.load(this.data.map((cur, i) => {
        return {
          nbr: i + 1,
          productName: cur.productName,
          sku: cur.sku,
          sellerName: cur.sellerName,
          productQuantity: cur.productQuantity,
          revenue: '$' + cur.revenue,
        };
      }));
    }
  }

  ngOnInit(): void {

  }
}
