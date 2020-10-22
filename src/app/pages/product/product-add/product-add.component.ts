import { NbToastrService } from '@nebular/theme';
import { ProductService } from './../../../@core/services/product.service';
import { Product } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'app/@core/models/business/product-type';
import { Supplier } from 'app/@core/models/business/supplier';
import { SupplierService } from 'app/@core/services/supplier.service';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  product = new Product();
  types: ProductType[];
  suppliers: Supplier[];

  constructor(private productService: ProductService,
              private toastrService: NbToastrService,
              private supplierService: SupplierService) { }

  ngOnInit(): void {
    // this.productService.listTypes().subscribe(data => {
    //   this.types = data.content;
    //   this.product.type = this.types[0];
    // });
    this.supplierService.list().subscribe(data => {
      this.suppliers = data.content;
      this.product.supplier = this.suppliers[0];
    });
  }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(
      res => {
        this.toastrService.show('New product has been added successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }
}
