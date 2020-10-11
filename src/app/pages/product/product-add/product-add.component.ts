import { NbToastrService } from '@nebular/theme';
import { ProductService } from './../../../@core/services/product.service';
import { Product } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  product = new Product();

  constructor(private productService: ProductService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(
      res => {
        this.toastrService.show('New product has been added successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }
}
