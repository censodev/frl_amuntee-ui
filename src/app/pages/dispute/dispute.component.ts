import { UtilService } from './../../@core/services/util.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DisputeService } from './../../@core/services/dispute.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { time } from 'console';

@Component({
  selector: 'ngx-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.scss'],
})
export class DisputeComponent implements OnInit {
  rawSrc: any[];
  source = new LocalDataSource();
  settings = {
    // mode: 'external',
    // hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      orderId: {
        title: 'Order ID',
        type: 'string',
      },
      transaction: {
        title: 'Transaction',
        type: 'string',
      },
      amount: {
        title: 'Amount',
        type: 'number',
      },
      disputeFee: {
        title: 'Dispute Fee',
        type: 'number',
      },
      paygateName: {
        title: 'Paygate',
        type: 'string',
      },
      total: {
        title: 'Total',
        type: 'number',
      },
      sellerId: {
        title: 'Seller',
        type: 'string',
      },
      reason: {
        title: 'Reason',
        type: 'string',
      },
      time: {
        title: 'Date',
        type: 'string',
      },
    },
  };

  constructor(private disputeService: DisputeService,
              private toastrService: NbToastrService,
              private util: UtilService) { }

  ngOnInit(): void {
    this.disputeService.list().subscribe(data => {
      this.rawSrc = data.content;
      this.source.load(data.content.map(i => {
        return {
          ...i,
          time: `${i.time[0]}/${i.time[1]}/${i.time[2]}`,
          disputeFee: this.util.formatCurrency(i.disputeFee),
        };
      }));
    });
  }

  sendCsv(files: FileList) {
    const file = files.item(0);
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.disputeService.upload(formData).subscribe(
      res => {
        this.toastrService.show('Import successfully.', 'Successful !', { status: 'success' });
        this.source.load([
          ...res.map(i => {
            return {
              ...i,
              time: `${i.time[0]}/${i.time[1]}/${i.time[2]}`,
              disputeFee: this.util.formatCurrency(i.disputeFee),
            };
          }),
          ...this.rawSrc,
        ]);
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        // tslint:disable-next-line: no-console
        console.log(err);
      });
  }
}
