import { ProductType } from 'app/@core/models/business/product-type';
import { ProductService } from 'app/@core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss'],
})
export class ProductTypeComponent implements OnInit {
  source: ProductType[];
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
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  constructor(private productService: ProductService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.productService.listTypes()
      .subscribe(res => this.source = res.content);
  }

  onEdited(evt: any) {
    this.productService.updateType(evt.newData)
      .subscribe(res => {
        evt.confirm.resolve();
        this.toastrService.show('The type has been updated successfully.', 'Successful !', { status: 'success' });
      }, err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

  onAdded(evt: any) {
    this.productService.addType(evt.newData)
      .subscribe(res => {
        evt.confirm.resolve();
        this.toastrService.show('New type has been added successfully.', 'Successful !', { status: 'success' });
      }, err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }
}
