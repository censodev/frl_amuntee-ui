import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SupplierService } from 'app/@core/services/supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  source = new LocalDataSource();
  settings = {
    actions: {
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      code: {
        title: 'Code',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  constructor(private supplierService: SupplierService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.supplierService.list()
      .subscribe(res => this.source.load(res.content));
  }

  onEdited(evt: any) {
    this.supplierService.update(evt.newData)
      .subscribe(res => {
        evt.confirm.resolve();
        this.toastrService.show('Supplier has been updated successfully.', 'Successful !', { status: 'success' });
      }, err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

  onAdded(evt: any) {
    this.supplierService.add(evt.newData)
      .subscribe(res => {
        evt.confirm.resolve();
        this.toastrService.show('New supplier has been added successfully.', 'Successful !', { status: 'success' });
      }, err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }
}
