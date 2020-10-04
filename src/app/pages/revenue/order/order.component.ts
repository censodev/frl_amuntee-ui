import { RevenueService } from './../../../@core/services/revenue.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  currentPage: number;

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
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      code: {
        title: 'Order Code',
        type: 'string',
      },
      name: {
        title: 'Order Name',
        type: 'string',
      },
      subTotalPrice: {
        title: 'Subtotal Price',
        type: 'double',
      },
      totalPrice: {
        title: 'Total Price',
        type: 'double',
      },
      financialStatus: {
        title: 'Financial Status',
        type: 'string',
      },
      fulfillmentStatus: {
        title: 'Fulfillment Status',
        type: 'string',
      },
    },
  };

  source = new LocalDataSource();

  constructor(private revenueService: RevenueService) { }

  ngOnInit(): void {
    this.revenueService.listOrder(100).subscribe(orders => {
      console.log(orders);
      this.source.load(orders.content);
    });
  }

  onEdited(evt: any) {
    console.log(evt);
  }

  onPageChanged(evt: any) {
    console.log(evt);
  }

}
