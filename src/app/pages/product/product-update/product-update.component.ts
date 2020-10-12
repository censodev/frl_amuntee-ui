import { Product } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from 'app/@core/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product = new Product();

  constructor(private productService: ProductService,
              private toastrService: NbToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.findOne(params['id']).subscribe(res => {
        this.product = res;
      });
    });
  }

  onSubmit() {
    this.productService.updateProduct(this.product).subscribe(
      res => {
        this.toastrService.show('Product has been updated successfully.', 'Successful !', { status: 'success' });
        // tslint:disable-next-line: no-console
        console.log(res);
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        // tslint:disable-next-line: no-console
        console.log(err);
      });
  }

}
